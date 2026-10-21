#!/bin/bash
# PostToolUse hook: after Claude edits a .vue/.ts file, block physical Tailwind direction classes.
# Exit 2 sends the message back to Claude so it fixes the file itself — no reviewer tokens needed.
input=$(cat)
file=$(echo "$input" | jq -r '.tool_input.file_path // empty')
[[ "$file" =~ \.(vue|ts|tsx)$ ]] || exit 0
[[ -f "$file" ]] || exit 0

hits=$(grep -nE '(^|[ "'"'"'`:])-?(ml|mr|pl|pr|left|right|border-l|border-r|rounded-l|rounded-r|rounded-tl|rounded-tr|rounded-bl|rounded-br)-[a-z0-9\[]|text-(left|right)\b' "$file" | head -10)
if [[ -n "$hits" ]]; then
  echo "RTL rule: replace physical Tailwind classes with logical ones (ms/me/ps/pe/start/end/text-start/text-end/border-s/border-e/rounded-s/rounded-e) in $file:" >&2
  echo "$hits" >&2
  exit 2
fi
exit 0
