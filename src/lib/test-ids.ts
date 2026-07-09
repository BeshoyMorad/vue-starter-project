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
    status: 'toast-status',
    message: 'toast-message',
    close: 'toast-close',
  },
  starter: {
    dashboard: 'starter-dashboard',
    card: 'starter-card',
    cardTitle: 'starter-card-title',
    cardDescription: 'starter-card-description',
    filterToggle: 'starter-filter-toggle',
    loading: 'starter-loading',
    error: 'starter-error',
    noData: 'starter-no-data',
  },
} as const;
