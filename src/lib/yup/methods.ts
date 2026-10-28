import type { MediaValue } from '@/types/media';
import i18n from '@/locales';
import parsePhoneNumberFromString from 'libphonenumber-js';
import * as yup from 'yup';

const { t } = i18n.global;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

function withField(fieldName: string | undefined, withFieldKey: string, plainKey: string) {
  return () => (fieldName ? t(withFieldKey, { field: fieldName }) : t(plainKey));
}

export function percentageSchema(fieldName?: string) {
  return yup
    .number()
    .typeError(withField(fieldName, 'yup.methods.number', 'yup.methods.numberPlain'))
    .required(withField(fieldName, 'yup.methods.required', 'yup.methods.requiredPlain'))
    .min(0, withField(fieldName, 'yup.methods.positive', 'yup.methods.positivePlain'))
    .max(100, withField(fieldName, 'yup.methods.maxPercent', 'yup.methods.maxPercentPlain'));
}

export function positiveNumberSchema(fieldName?: string) {
  return yup
    .number()
    .typeError(withField(fieldName, 'yup.methods.number', 'yup.methods.numberPlain'))
    .required(withField(fieldName, 'yup.methods.required', 'yup.methods.requiredPlain'))
    .min(0, withField(fieldName, 'yup.methods.positive', 'yup.methods.positivePlain'));
}

export function phoneSchema(fieldName: string, message?: string) {
  return yup.string().test(
    fieldName,
    () => message ?? t('yup.methods.phone'),
    (value) => {
      if (!value) return true;
      try {
        const phoneNumber = parsePhoneNumberFromString(value);

        return phoneNumber?.isValid() ?? false;
      } catch {
        return false;
      }
    }
  );
}

export function passwordSchema(fieldName?: string) {
  const label = () => fieldName ?? t('yup.methods.passwordLabel');

  return yup
    .string()
    .required(() => t('yup.methods.required', { field: label() }))
    .matches(PASSWORD_REGEX, () => t('yup.methods.password'));
}

export function requiredMediaSchema(message?: string) {
  return yup.mixed().test(
    'required-media',
    () => message ?? t('yup.methods.mediaRequired'),
    (val) => {
      if (!val || typeof val !== 'object') return false;
      const media = val as MediaValue;
      return Boolean(media.file || media.mediaId || (media.initialUrl && !media.wasRemoved));
    }
  );
}

export function optionalMediaSchema(message?: string) {
  return yup
    .mixed()
    .test(
      'optional-media',
      () => message ?? t('yup.methods.mediaInvalid'),
      (val) => {
        if (!val) return true;
        if (typeof val !== 'object') return false;
        return true;
      }
    )
    .nullable()
    .optional();
}
