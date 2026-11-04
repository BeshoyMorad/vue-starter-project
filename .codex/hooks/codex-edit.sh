#!/bin/bash
# Codex adapter for apply_patch hooks.  Usage: codex-edit.sh pre|post   (hook JSON on stdin)
# pre  -> protect-files.sh on every file in the patch (exit 2 blocks)
# post -> post-edit.sh on every touched file; feedback is returned as additionalContext
mode="$1"
dir="$(cd "$(dirname "$0")" && pwd)"
hooks="$dir/../../.claude/hooks"
input=$(cat)
cwd=$(echo "$input" | jq -r '.cwd // empty')
patch=$(echo "$input" | jq -r '.tool_input.command // empty')

files=()
while IFS= read -r p; do
  [[ -n "$p" ]] || continue
  [[ "$p" = /* ]] || p="${cwd:-$PWD}/$p"
  files+=("$p")
done < <(echo "$patch" | sed -nE 's/^\*\*\* (Add File|Update File|Delete File|Move to): (.+)$/\2/p')
[[ ${#files[@]} -gt 0 ]] || exit 0

if [[ "$mode" == "pre" ]]; then
  exec "$hooks/protect-files.sh" "${files[@]}"
fi

msg=$("$hooks/post-edit.sh" "${files[@]}" 2>&1 >/dev/null)
if [[ $? -eq 2 && -n "$msg" ]]; then
  jq -n --arg m "$msg" '{hookSpecificOutput:{hookEventName:"PostToolUse",additionalContext:$m}}'
fi
exit 0
