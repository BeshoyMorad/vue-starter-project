import { parsePhoneNumberFromString } from 'libphonenumber-js';
import * as yup from 'yup';

export function phoneSchema(message = 'Please enter a valid phone number') {
  return yup.string().test('phone', message, (value) => {
    if (!value) return true; // Let .required() handle empty values
    try {
      const phoneNumber = parsePhoneNumberFromString(value);

      return phoneNumber?.isValid() ?? false;
    } catch {
      return false;
    }
  });
}
