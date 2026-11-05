import type { DocSection } from '@/modules/doc/shared/types';

export const RULES_SKILLS_DOC = {
  title: 'Rules and Skills (.claude)',
  description:
    'The .claude folder holds the written standards of this project in a form that both people and AI assistants follow. Rules say what is allowed, skills say how to do a task step by step, hooks enforce the mechanical parts. Use them together with the helper module, which is a complete working example.',
} as const;

const STRUCTURE_CODE = `.claude/
  rules/     13 short standards, loaded automatically by file path (paths: globs)
  skills/    step by step recipes: new-feature, add-endpoint, add-translation, verify, fe-review
  agents/    fe-reviewer (read-only review), test-writer (writes *.spec.ts)
  hooks/     scripts that run after an edit or before a shell command
  settings.json  permissions and hook wiring

AGENTS.md    shared summary for Codex, Gemini CLI and Cursor (CLAUDE.md imports it)`;

const RULES_ITEMS = [
  {
    name: 'data-fetching.md',
    description:
      'api client, apiRoute, QUERY_KEYS, services return typed payloads, useDataTable / useDataInfiniteScroll, errors via apiError. Matches: services, composables, .vue.',
  },
  {
    name: 'forms-and-validation.md',
    description:
      'vee-validate + yup, schemas in schemas/*.schema.ts, shared rules from @/lib/yup, Field.* components, applyApiErrorToForm, uploads with useFormMedia.',
  },
  {
    name: 'module-structure.md',
    description:
      'Layout of src/modules/<feature>. Shared code moves to src/ only when a second module needs it.',
  },
  {
    name: 'routing.md',
    description:
      'Route names from paths, <feature>.routes.ts and <feature>.paths.ts, lazy pages, meta.title, guards.',
  },
  {
    name: 'vue-ui.md',
    description:
      'script setup, reuse src/components, PageWrapper, RTL logical classes, TEST_IDS, formatters.',
  },
  {
    name: 'typescript.md',
    description:
      'No any, interface over type, import type, files under 300 lines, functions under 50.',
  },
  {
    name: 'i18n.md and styling.md',
    description:
      'JSON locales in en and ar, no hardcoded strings. Tokens from token.css, cn(), CVA.',
  },
  {
    name: 'state-management.md, permissions.md, testing.md',
    description: 'Pinia for client state only, can("resource.action"), Vitest with MSW.',
  },
] as const;

const SKILLS_ITEMS = [
  {
    name: '/new-feature',
    description:
      'Scaffold a module: routes, paths, page, service, composable, schema, locales, test ids.',
  },
  {
    name: '/add-endpoint',
    description: 'Route in endpoints.ts, key in QUERY_KEYS, types, service, composable, test.',
  },
  {
    name: '/add-translation',
    description: 'Add a key to both en and ar JSON files and keep key order identical.',
  },
  {
    name: '/verify',
    description:
      'Lint changed files, type-check and run only the relevant spec before you say done.',
  },
  {
    name: '/fe-review',
    description: 'Review your branch diff against all the rules and list findings as a table.',
  },
] as const;

const WORKFLOW_CODE = `New feature "assets" - how the rules, skills and helper module work together

1. Read the helper module   src/modules/helper (services, schemas, composables,
                            mutations, components, columns, pages) = the target shape
2. /new-feature             creates the folders and registers paths and routes
3. API contract             check global.d.ts matches the backend (API Contract page)
4. /add-endpoint            route + QUERY_KEY + types + service (Services page)
5. Table page               useDataTable + Table + columns (useDataTable pages)
6. Form                     schema + mutation + useXForm + template (Building Forms page)
7. Upload                   useFormMedia + Field.ImageUpload (Uploads page)
8. /add-translation         every label in en and ar
9. test ids + permissions   TEST_IDS keys, can('assets.create'), route guard
10. /verify, then /fe-review before the PR`;

const HELPER_MAP_CODE = `src/modules/helper                      what to copy from it
  types.ts                              entity + payload interfaces, filter interface
  services/index.ts                     assetsServices object (apiRoute + api)
  schemas/*.schema.ts                   yup schema + InferType
  mutations/*.ts                        useMutation + invalidate + success toast
  composables/useCustomTokenForm.ts     form + upload + error handling
  composables/useAvailableAssetsForm.ts form with an infinite list and selection
  columns/index.ts                      ColumnDef[] with h(EntityAvatar / StatusBadge)
  components/*Form.vue                  template-only forms with Field.*
  components/AssetFiltersDialog.vue     FormDialog + filters emitted to setFilters
  pages/Index.vue                       PageWrapper + useDataTable + Table + dialogs`;

export const RULES_SKILLS_SECTIONS: readonly DocSection[] = [
  {
    title: 'What is inside .claude',
    description:
      'Rules and skills are plain Markdown: read them like documentation even if you do not use an AI assistant.',
    code: STRUCTURE_CODE,
    header: 'structure',
  },
  {
    title: 'Rules',
    description:
      'Short and strict. Each rule starts with a paths: list, so it is loaded when you edit a matching file.',
    items: RULES_ITEMS,
  },
  {
    title: 'Skills',
    description:
      'Type the name in Claude Code to run the recipe. Other tools can read .claude/skills/<name>/SKILL.md and follow it.',
    items: SKILLS_ITEMS,
  },
  {
    title: 'Using them with the helper module',
    description:
      'The helper module is the worked example of everything in the rules. Build in this order.',
    code: WORKFLOW_CODE,
    header: 'workflow',
  },
  {
    title: 'Where each piece lives in helper',
    description: 'Open the matching file next to the standard you are following.',
    code: HELPER_MAP_CODE,
    header: 'src/modules/helper',
  },
];
