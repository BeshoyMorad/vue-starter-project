#!/bin/bash
# Blocks shell commands that hang or discard work.
#   guard-bash.sh            reads hook JSON on stdin (tool_input.command)
#   guard-bash.sh "<cmd>"    checks an explicit command
if [[ $# -gt 0 ]]; then cmd="$*"; else cmd=$(jq -r '.tool_input.command // empty'); fi
[[ -n "$cmd" ]] || exit 0

if [[ "$cmd" =~ (vitest|test:unit) && ! "$cmd" =~ (--run|vitest[[:space:]]+run|--watch=false|[[:space:]]-r[[:space:]]) ]]; then
  echo "Blocked: vitest starts watch mode and hangs. Run 'pnpm test:unit --run <file>'." >&2; exit 2
fi
if [[ "$cmd" =~ git[[:space:]]+push.*(--force|[[:space:]]-f([[:space:]]|$)) ]]; then
  echo "Blocked: force push. Ask the user first." >&2; exit 2
fi
if [[ "$cmd" =~ (--no-verify|git[[:space:]]+reset[[:space:]]+--hard|git[[:space:]]+clean[[:space:]]+-[a-z]*f|git[[:space:]]+checkout[[:space:]]+--[[:space:]]) ]]; then
  echo "Blocked: this discards work or skips the pre-commit hook. Ask the user first." >&2; exit 2
fi
exit 0
