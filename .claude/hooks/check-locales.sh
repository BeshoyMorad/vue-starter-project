#!/bin/bash
# Usage: check-locales.sh <file>. For locale JSON files, compares the key set with the en/ar counterpart.
file="$1"
[[ "$file" =~ \.json$ ]] || exit 0

if [[ "$file" =~ /locales/(en|ar)/[^/]+\.json$ ]]; then
  lang="${BASH_REMATCH[1]}"; other=$([[ "$lang" == "en" ]] && echo ar || echo en)
  twin=$(echo "$file" | sed "s#/locales/$lang/#/locales/$other/#")
elif [[ "$file" =~ /locales/src/common/(en|ar)\.json$ ]]; then
  lang="${BASH_REMATCH[1]}"; other=$([[ "$lang" == "en" ]] && echo ar || echo en)
  twin="${file%/$lang.json}/$other.json"
else
  exit 0
fi

if [[ ! -f "$twin" ]]; then
  echo "i18n rule: $twin is missing. Every locale file needs both en and ar."
  exit 0
fi

keys() { jq -r '[paths(scalars) | map(tostring) | join(".")] | sort | .[]' "$1" 2>/dev/null; }
diff=$(diff <(keys "$file") <(keys "$twin") | grep -E '^[<>]' | head -15)
if [[ -n "$diff" ]]; then
  echo "i18n rule: key mismatch between $file ('<') and $twin ('>'). Add the missing keys (translate the Arabic value; never leave English text in ar):"
  echo "$diff"
fi
exit 0
