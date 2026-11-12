#!/bin/bash
# Usage: check-conventions.sh <file>. Cheap grep checks for the team's architecture rules.
# STACK is the only per-repo setting: vue-spa | nuxt | ddd | monorepo
STACK="vue-spa"

file="$1"
[[ "$file" =~ \.(vue|ts|tsx)$ ]] || exit 0
[[ "$file" =~ (\.spec\.ts|\.test\.ts|\.d\.ts|/tests/|\.generated\.ts)$ ]] && exit 0

out=""
add() { out+="$1"$'\n'; }
scan() { # scan <message> <grep -E pattern> [exclude-line-pattern]
  local hits
  hits=$(grep -nE "$2" "$file" | { [[ -n "$3" ]] && grep -vE "$3" || cat; } | head -5)
  [[ -n "$hits" ]] && add "$1 ($file):"$'\n'"$hits"
}

base=$(basename "$file")

# Data fetching
[[ "$base" != "query-keys.ts" && "$base" != "vue-query.ts" && "$base" != "query-client.ts" ]] &&
  scan "Inline queryKey: add the key to the QUERY_KEYS registry and use it" 'queryKey:[[:space:]]*\[' 'QUERY_KEYS'
[[ "$base" != "endpoints.ts" && ! "$file" =~ /(server|api)/ ]] &&
  scan "Hardcoded API URL: add a route to endpoints.ts and use apiRoute('name')" "['\"\`]/api/"

# Test ids and design tokens
scan "Wrong test attribute: use :data-test-id with a value from TEST_IDS" 'data-test[=[:space:]]'
scan "Raw hex color: use a token from the css token file" '(bg|text|border|fill|stroke|ring|from|to|via)-\[#[0-9a-fA-F]{3,8}\]'

# Security, accessibility and type safety
scan "v-html: only with sanitized content (see the security rule)" 'v-html|\.innerHTML[[:space:]]*='
scan "target=_blank without rel=\"noopener noreferrer\"" 'target=["'"'"']_blank["'"'"']' 'rel='
scan "Click handler on a non-interactive element: use <button> or <a href>" '<(div|span|li|td|p)[[:space:]][^>]*@click'
scan "Type suppression: fix the type, or use @ts-expect-error with a reason" '@ts-(ignore|nocheck)'
[[ ! "$file" =~ /components/form/ ]] &&
  scan "Own file input/upload: use Field.ImageUpload / Field.FileUpload with useFormMedia (uploads rule)" 'type=["'"'"']file["'"'"']|new FormData\('
scan "Local copy of the API envelope: use the global ApiResponse / Meta contract (api-contract rule)" '(interface|type)[[:space:]]+[A-Za-z]*(PaginationMeta|PageInfo|ApiResponse)\b' '/types/global\.d\.ts'

# Parent-relative imports (eslint warns too)
scan "Parent-relative import: use the @/ alias" "from ['\"]\.\./"

case "$STACK" in
  vue-spa)
    scan "Direct localStorage access: persist through useLocalStorage in a store" '(^|[^a-zA-Z.])(localStorage|sessionStorage)\.' ;;
  nuxt)
    if [[ ! "$file" =~ \.client\.ts$ ]]; then
      scan "Browser global at module scope (SSR crash): move it into onMounted, a client plugin, or guard with import.meta.client" '^[^[:space:]/*].*\b(window|document|localStorage|sessionStorage|navigator)\.' 'typeof '
      scan "Direct storage access: use useCookie (auth) or a client-only composable" '(^|[^a-zA-Z.])(localStorage|sessionStorage)\.' '^[[:space:]]*(//|\*)|import\.meta\.client|process\.client'
    fi ;;
  ddd)
    if [[ "$file" =~ /src/domains/([^/]+)/ ]]; then
      me="${BASH_REMATCH[1]}"
      scan "Cross-domain import: a domain never imports another domain; move shared code down to core/ or shared/" "from ['\"](@/domains|@domains)/" "(@/domains|@domains)/$me([/'\"])"
      scan "Upward import: domains must not import from app/ (only app/router guards and paths are allowed)" "from ['\"](@/app|@app)" "(@/app|@app)/router"
    elif [[ "$file" =~ /src/core/ ]]; then
      scan "Upward import: core may import only core and shared (app/router is the one tolerated exception)" "from ['\"](@/domains|@domains|@/app|@app)" "(@/app|@app)/router"
    elif [[ "$file" =~ /src/shared/ ]]; then
      scan "Upward import: shared must not import domains/ or app/" "from ['\"](@/domains|@domains|@/app|@app)"
    fi
    scan "Direct localStorage access: persist through useLocalStorage in a store" '(^|[^a-zA-Z.])(localStorage|sessionStorage)\.' ;;
  monorepo)
    scan "Cross-app relative import: share code through @workspace/* packages" "from ['\"](\.\./){2,}(apps|packages)/"
    if [[ "$file" =~ /packages/(core|ui|locales)/ ]]; then
      scan "Package imports an app alias or app code: packages must not depend on apps" "from ['\"](@/|@app/)"
      scan "Browser global at module scope (packages must stay SSR-safe)" '^[^[:space:]/*].*\b(window|document|localStorage|sessionStorage|navigator)\.' 'typeof '
    fi
    [[ "$file" =~ /packages/core/ ]] &&
      scan "packages/core must not import @workspace/ui (core is below ui)" "from ['\"]@workspace/ui"
    if [[ "$file" =~ /apps/domain-driven/src/domains/([^/]+)/ ]]; then
      me="${BASH_REMATCH[1]}"
      scan "Cross-domain import: a domain never imports another domain" "from ['\"]@/domains/" "@/domains/$me([/'\"])"
    fi
    [[ "$file" =~ /apps/(base-template|domain-driven)/ ]] &&
      scan "Direct localStorage access: persist through useLocalStorage in a store" '(^|[^a-zA-Z.])(localStorage|sessionStorage)\.' ;;
esac

[[ -n "$out" ]] && { echo "Convention check:"; printf '%s' "$out"; }
exit 0
