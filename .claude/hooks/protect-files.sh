#!/bin/bash
# Blocks edits to generated, build, secret, and lock files.
#   protect-files.sh            reads hook JSON on stdin (tool_input.file_path)
#   protect-files.sh <file>...  checks explicit paths (Codex adapter)
files=()
if [[ $# -gt 0 ]]; then files=("$@"); else
  f=$(jq -r '.tool_input.file_path // empty'); [[ -n "$f" ]] && files+=("$f")
fi

for file in "${files[@]}"; do
  if [[ "$file" =~ (^|/)pnpm-lock\.yaml$ ]]; then
    echo "Blocked: never edit pnpm-lock.yaml by hand. Change package.json and let pnpm update it, and tell the user." >&2; exit 2
  fi
  if [[ "$file" =~ (^|/)\.env(\.[a-z]+)?$ && ! "$file" =~ \.env\.example$ ]]; then
    echo "Blocked: do not edit .env files. Add the variable to .env.example and the env validation file, and tell the user." >&2; exit 2
  fi
  if [[ "$file" =~ \.generated\.ts$ ]]; then
    echo "Blocked: $file is generated. Edit the source JSON and run 'pnpm locales:types' (or 'pnpm type-check')." >&2; exit 2
  fi
  if [[ "$file" =~ /(dist|\.nuxt|\.output|\.turbo|node_modules|\.husky/_)/ ]]; then
    echo "Blocked: $file is a build output or dependency folder." >&2; exit 2
  fi
done
exit 0
