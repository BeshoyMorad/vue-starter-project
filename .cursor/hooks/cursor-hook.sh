#!/bin/bash
# Cursor adapter for the shared hooks in .claude/hooks/.
# Usage: cursor-hook.sh shell|pre-write|post-write|format   (hook JSON on stdin; Cursor runs it from the project root)
#   shell       beforeShellExecution -> guard-bash.sh      (permission allow/deny)
#   pre-write   preToolUse Write|Delete -> protect-files.sh (permission allow/deny)
#   post-write  postToolUse Write -> post-edit.sh           (findings returned as additional_context)
#   format      afterFileEdit -> prettier only              (this event cannot send feedback)
dir="$(cd "$(dirname "$0")" && pwd)"
root="$(cd "$dir/../.." && pwd)"
hooks="$root/.claude/hooks"
input=$(cat)

# The Write tool's path key is not documented, so try the likely ones.
edited_path() {
  echo "$input" | jq -r '(.file_path // .tool_input.file_path // .tool_input.path // .tool_input.target_file // .tool_input.filePath // empty)'
}
deny() { jq -n --arg m "$1" '{permission:"deny",user_message:$m,agent_message:$m}'; }

case "$1" in
  shell)
    cmd=$(echo "$input" | jq -r '.command // empty')
    [[ -n "$cmd" ]] || { echo '{"permission":"allow"}'; exit 0; }
    msg=$("$hooks/guard-bash.sh" "$cmd" 2>&1 >/dev/null); rc=$?
    if [[ $rc -eq 2 ]]; then deny "$msg"; else echo '{"permission":"allow"}'; fi ;;
  pre-write)
    file=$(edited_path)
    [[ -n "$file" ]] || { echo '{"permission":"allow"}'; exit 0; }
    msg=$("$hooks/protect-files.sh" "$file" 2>&1 >/dev/null); rc=$?
    if [[ $rc -eq 2 ]]; then deny "$msg"; else echo '{"permission":"allow"}'; fi ;;
  post-write)
    files=()
    file=$(edited_path)
    if [[ -n "$file" ]]; then files+=("$file"); else
      # Unknown payload shape: check source files touched in the last minute.
      while IFS= read -r f; do files+=("$f"); done < <(find "$root" -type f \( -name '*.vue' -o -name '*.ts' -o -name '*.json' -o -name '*.css' \) -mmin -1 \
        -not -path '*/node_modules/*' -not -path '*/dist/*' -not -path '*/.nuxt/*' -not -path '*/.output/*' -not -path '*/.turbo/*' -not -path '*/.git/*' | head -10)
    fi
    [[ ${#files[@]} -gt 0 ]] || { echo '{}'; exit 0; }
    msg=$("$hooks/post-edit.sh" "${files[@]}" 2>&1 >/dev/null); rc=$?
    if [[ $rc -eq 2 && -n "$msg" ]]; then jq -n --arg m "$msg" '{additional_context:$m}'; else echo '{}'; fi ;;
  format)
    file=$(edited_path)
    [[ "$file" =~ \.(vue|ts|tsx|js|mjs|json|css)$ && -f "$file" ]] || exit 0
    [[ "$file" =~ /(node_modules|dist|\.nuxt|\.output|\.turbo)/ ]] && exit 0
    cd "$root" && pnpm exec prettier --write "$file" >/dev/null 2>&1
    exit 0 ;;
esac
exit 0
