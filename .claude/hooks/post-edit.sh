#!/bin/bash
# Post-edit checks, shared by Claude Code, Gemini CLI, and Codex (via thin adapters).
#   post-edit.sh            reads hook JSON on stdin (tool_input.file_path)
#   post-edit.sh <file>...  checks explicit files (Codex adapter, or run by hand after editing)
# Runs sequentially so formatting finishes before any check reads the file:
# prettier -> RTL -> conventions -> locale parity -> eslint.
# Exit 2 prints the collected messages on stderr so the agent can fix the file itself.
dir="$(cd "$(dirname "$0")" && pwd)"
root="$(cd "$dir/../.." && pwd)"

files=()
if [[ $# -gt 0 ]]; then
  for f in "$@"; do [[ "$f" = /* ]] || f="$PWD/$f"; files+=("$f"); done
else
  input=$(cat)
  f=$(echo "$input" | jq -r '.tool_input.file_path // empty')
  [[ -n "$f" ]] && files+=("$f")
fi
[[ ${#files[@]} -gt 0 ]] || exit 0
cd "$root" || exit 0

msgs=""
for file in "${files[@]}"; do
  [[ -f "$file" ]] || continue
  [[ "$file" =~ /(node_modules|dist|\.nuxt|\.output|\.turbo|graphify-out)/ ]] && continue

  if [[ "$file" =~ \.(vue|ts|tsx|js|mjs|json|css)$ ]]; then
    pnpm exec prettier --write "$file" >/dev/null 2>&1
  fi

  for check in check-rtl check-conventions check-locales; do
    out=$("$dir/$check.sh" "$file" 2>&1)
    [[ -n "$out" ]] && msgs+="$out"$'\n'
  done

  if [[ "$file" =~ \.(vue|ts|tsx)$ ]]; then
    lint=$(pnpm exec eslint "$file" 2>&1 | grep -E "^\s+[0-9]+:[0-9]+\s+error" | head -10)
    [[ -n "$lint" ]] && msgs+="ESLint errors in $file:"$'\n'"$lint"$'\n'
  fi
done

if [[ -n "$msgs" ]]; then
  printf '%s' "$msgs" >&2
  exit 2
fi
exit 0
