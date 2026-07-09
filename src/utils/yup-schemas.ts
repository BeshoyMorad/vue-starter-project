import parsePhoneNumberFromString from 'libphonenumber-js';
import * as yup from 'yup';

export function percentageSchema(fieldName?: string) {
  return yup
    .number()
    .typeError(fieldName ? `${fieldName} must be a number` : 'Must be a number')
    .required(fieldName ? `${fieldName} is required` : 'Required')
    .min(0, fieldName ? `${fieldName} must be positive` : 'Must be positive')
    .max(100, fieldName ? `${fieldName} max is 100%` : 'Max 100%');
}

export function positiveNumberSchema(fieldName?: string) {
  return yup
    .number()
    .typeError(fieldName ? `${fieldName} must be a number` : 'Must be a number')
    .required(fieldName ? `${fieldName} is required` : 'Required')
    .min(0, fieldName ? `${fieldName} must be positive` : 'Must be positive');
}

export function phoneSchema(message = 'Please enter a valid phone number') {
  return yup.string().test('phone', message, (value) => {
    if (!value) return true;
    try {
      const phoneNumber = parsePhoneNumberFromString(value);

      return phoneNumber?.isValid() ?? false;
    } catch {
      return false;
    }
  });
}
