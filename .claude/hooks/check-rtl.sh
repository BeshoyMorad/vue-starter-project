#!/bin/bash
# Usage: check-rtl.sh <file>. Prints a message when physical Tailwind direction classes are found.
file="$1"
[[ "$file" =~ \.(vue|ts|tsx)$ ]] || exit 0
[[ "$file" =~ \.(spec|test)\.ts$ ]] && exit 0

hits=$(grep -nE '(^|[ "'"'"'`:])-?(ml|mr|pl|pr|left|right|border-l|border-r|rounded-l|rounded-r|rounded-tl|rounded-tr|rounded-bl|rounded-br)-[a-z0-9\[]|text-(left|right)\b' "$file" | head -10)
if [[ -n "$hits" ]]; then
  echo "RTL rule: replace physical Tailwind classes with logical ones (ms/me/ps/pe/start/end/text-start/text-end/border-s/border-e/rounded-s/rounded-e) in $file:"
  echo "$hits"
fi
exit 0
