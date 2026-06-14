export const TEST_IDS = {
  auth: {
    login: {
      form: 'login-form',
      email: 'login-form-email',
      password: 'login-form-password',
      submitButton: 'login-submit-button',
    },
  },
  table: {
    pagination: {
      limit: 'table-pagination-limit',
      limitOption: 'table-pagination-limit-option',
      previous: 'table-pagination-previous',
      next: 'table-pagination-next',
    },
  },
  toast: {
    success: 'toast-success',
    info: 'toast-info',
    warning: 'toast-warning',
    error: 'toast-error',
    loading: 'toast-loading',
    close: 'toast-close',
  },
} as const;
