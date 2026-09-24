export const TEST_IDS_DOM = {
  title: 'Test IDs',
  description:
    'A centralized system for defining test IDs and passing them to components. Use TEST_IDS as the single source of truth for selectors used in automated and component tests.',

  location: {
    title: 'Where are the Test IDs?',
    description:
      'All test IDs are defined in the src/lib/test-ids.ts file. New developers can start from this file when they need to add or find a test selector.',
    path: 'src/lib/test-ids.ts',
  },

  centralized: {
    title: 'Centralized Test IDs',
    description:
      'The test-ids.ts file contains the global TEST_IDS object. Keeping selectors in one place prevents duplicated strings and makes test IDs easier to find and maintain.',
    filePath: 'src/lib/test-ids.ts',
    howToUse:
      'Add the test ID to TEST_IDS, then import TEST_IDS and pass the required value to the component through its testId prop.',
  },

  componentUsage: {
    title: 'Component Usage',
    description:
      'Components accept a testId prop so each component can expose a stable selector without hard-coding test IDs inside the component itself.',
    howToUse:
      'Import TEST_IDS from @/lib/test-ids and pass the appropriate test ID to the component using the testId prop.',
  },

  structure: {
    title: 'Structure',
  },
} as const;

export const TEST_IDS_IMPORT_CODE = `import { TEST_IDS } from '@/lib/test-ids';`;

export const TEST_IDS_PROJECT_STRUCTURE = `📁 src/
└── 📁 lib/
    └── 📄 test-ids.ts
`;

export const TEST_IDS_CODE = `/**
 * Centralized registry for all Test IDs.
 * Use these constants instead of hard-coding
 * test selector strings inside components.
 */

export const TEST_IDS = {
  buttons: {
    submit: 'submit-button',
    cancel: 'cancel-button',
  },

  users: {
    search: 'users-search',
    table: 'users-table',
    create: 'users-create',
  },

  forms: {
    loginEmail: 'login-email',
    loginPassword: 'login-password',
    loginSubmit: 'login-submit',
  },
} as const;`;

export const TEST_IDS_BUTTON_CODE = `import { TEST_IDS } from '@/lib/test-ids';
import Button from '@/components/button/Button.vue';

<Button
  :test-id="TEST_IDS.buttons.submit"
  label="Submit"
/>`;

export const TEST_IDS_COMPONENT_CODE = `<script setup lang="ts">
defineProps<{
  testId?: string;
}>();
</script>

<template>
  <button
    :data-test-id="testId"
    type="button"
  >
    <slot />
  </button>
</template>`;
