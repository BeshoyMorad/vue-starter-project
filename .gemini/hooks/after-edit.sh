#!/bin/bash
# Gemini CLI AfterTool adapter for write_file|replace. stdout must be JSON only.
dir="$(cd "$(dirname "$0")" && pwd)"
msg=$("$dir/../../.claude/hooks/post-edit.sh" 2>&1 >/dev/null)
if [[ $? -eq 2 && -n "$msg" ]]; then
  jq -n --arg m "$msg" '{hookSpecificOutput:{hookEventName:"AfterTool",additionalContext:$m}}'
fi
exit 0
