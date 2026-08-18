import parsePhoneNumberFromString from 'libphonenumber-js';
import * as yup from 'yup';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&/])[A-Za-z\d@$!%*?&/]{8,}$/;
const PASSWORD_MESSAGE =
  'Password must be at least 8 characters, include uppercase, lowercase, number and special character';

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

export function phoneSchema(fieldName: string, message = 'Please enter a valid phone number') {
  return yup.string().test(fieldName, message, (value) => {
    if (!value) return true;
    try {
      const phoneNumber = parsePhoneNumberFromString(value);

      return phoneNumber?.isValid() ?? false;
    } catch {
      return false;
    }
  });
}

export function passwordSchema(fieldName: string = 'Password') {
  return yup
    .string()
    .required(`${fieldName} is required`)
    .matches(PASSWORD_REGEX, PASSWORD_MESSAGE);
}
