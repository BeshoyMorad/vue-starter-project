export const TOASTER_IMPORT_CODE = `import {
  info,
  success,
  error,
  warn,
} from '@/utils/toast';`;

export const TOASTER_CODE_HEADER = {
  import: 'Import',
  script: 'Script',
  template: 'Template',
};

export const TOASTER_DOC = {
  title: 'Toaster',

  description:
    'A notification utility for displaying informative, success, warning, and error messages throughout the application.',

  import: {
    title: 'Import',
    description: 'Import the toast notification functions from the shared toast utility.',
  },

  examples: {
    title: 'Examples',
    description: 'Common usage examples of the toast notification utility.',
  },

  info: {
    title: 'Info',
    description: 'Display an informational notification to provide additional context to the user.',
    howToUse:
      'Use info with a title and optional body. An optional action callback can also be provided.',
    buttonLabel: 'Show Info',
    titleText: 'Profile Updated',
    body: 'Your profile has been updated successfully.',
  },

  success: {
    title: 'Success',
    description: 'Display a success notification after an operation has completed successfully.',
    howToUse: 'Use success with an optional message body to indicate a successful operation.',
    buttonLabel: 'Show Success',
    body: 'Your changes have been saved successfully.',
  },

  error: {
    title: 'Error',
    description: 'Display an error notification when an operation fails.',
    howToUse:
      'Use error with an optional message body to inform the user about an unsuccessful operation.',
    buttonLabel: 'Show Error',
    body: 'Unable to save your changes.',
  },

  warn: {
    title: 'Warning',
    description:
      'Display a warning notification when the user needs to review or pay attention to something.',
    howToUse: 'Use warn with an optional message body to display a warning notification.',
    buttonLabel: 'Show Warning',
    body: 'Please review your changes before continuing.',
  },

  action: {
    title: 'With Action',
    description:
      'Display a notification with an action callback that runs when the toast is clicked.',
    howToUse:
      'Pass a callback as the third argument to info to handle an action when the notification is clicked.',
    buttonLabel: 'Show Action',
    titleText: 'New Message',
    body: 'You have a new message.',
  },
};
export const TOASTER_INFO_CODE = {
  template: `<Button
   class="rounded-md border px-4 py-2 text-sm font-medium"
   @click="toast">
    {{ ${TOASTER_DOC.info.buttonLabel} }}
</Button>`,
  script: `const toast = () => 
  info('Profile Updated',
  'Your profile has been updated successfully.',
);`,
};

export const TOASTER_SUCCESS_CODE = {
  template: `<Button
   class="rounded-md border px-4 py-2 text-sm font-medium"
   @click="toast">
    {{ ${TOASTER_DOC.success.buttonLabel} }}
</Button>`,
  script: `const toast = () => 
  success('Changes Saved',
  'Your changes have been saved successfully.',
);`,
};

export const TOASTER_ERROR_CODE = {
  template: `<Button
   class="rounded-md border px-4 py-2 text-sm font-medium"
   @click="toast">
    {{ ${TOASTER_DOC.error.buttonLabel} }}
</Button>`,
  script: `const toast = () => 
  error('Unable to Save',
  'Unable to save your changes.',
);`,
};

export const TOASTER_WARN_CODE = {
  template: `<Button
   class="rounded-md border px-4 py-2 text-sm font-medium"
   @click="toast">
    {{ ${TOASTER_DOC.warn.buttonLabel} }}
</Button>`,
  script: `const toast = () => 
  warn('Review Changes',
  'Please review your changes before continuing.',
);`,
};

export const TOASTER_ACTION_CODE = {
  template: `<Button
   class="rounded-md border px-4 py-2 text-sm font-medium"
   @click="toast">
    {{ ${TOASTER_DOC.action.buttonLabel} }}
</Button>`,
  script: `const toast = () => 
  info('New Message',
  'You have a new message.',
  () => {
    console.log('Action clicked');
  },
);`,
};
