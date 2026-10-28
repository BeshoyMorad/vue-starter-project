import { setLocale } from 'yup';
import { yupFieldPath, yupParamText, type YupMessageParams } from '@/lib/yup/translate';
import i18n from '@/locales';

const { t } = i18n.global;

const yupLocale = {
  mixed: {
    default: (params: YupMessageParams) => t('yup.mixed.default', { path: yupFieldPath(params) }),
    required: (params: YupMessageParams) => t('yup.mixed.required', { path: yupFieldPath(params) }),
    defined: (params: YupMessageParams) => t('yup.mixed.defined', { path: yupFieldPath(params) }),
    notNull: (params: YupMessageParams) => t('yup.mixed.notNull', { path: yupFieldPath(params) }),
    oneOf: (params: YupMessageParams) =>
      t('yup.mixed.oneOf', {
        path: yupFieldPath(params),
        values: yupParamText(params.values),
      }),
    notOneOf: (params: YupMessageParams) =>
      t('yup.mixed.notOneOf', {
        path: yupFieldPath(params),
        values: yupParamText(params.values),
      }),
    notType: (params: YupMessageParams) =>
      t('yup.mixed.notType', {
        path: yupFieldPath(params),
        type: yupParamText(params.type),
      }),
  },
  string: {
    length: (params: YupMessageParams) =>
      t('yup.string.length', {
        path: yupFieldPath(params),
        length: yupParamText(params.length),
      }),
    min: (params: YupMessageParams) =>
      t('yup.string.min', {
        path: yupFieldPath(params),
        min: yupParamText(params.min),
      }),
    max: (params: YupMessageParams) =>
      t('yup.string.max', {
        path: yupFieldPath(params),
        max: yupParamText(params.max),
      }),
    matches: (params: YupMessageParams) =>
      t('yup.string.matches', {
        path: yupFieldPath(params),
        regex: yupParamText(params.regex),
      }),
    email: (params: YupMessageParams) => t('yup.string.email', { path: yupFieldPath(params) }),
    url: (params: YupMessageParams) => t('yup.string.url', { path: yupFieldPath(params) }),
    uuid: (params: YupMessageParams) => t('yup.string.uuid', { path: yupFieldPath(params) }),
    datetime: (params: YupMessageParams) =>
      t('yup.string.datetime', { path: yupFieldPath(params) }),
    datetime_offset: (params: YupMessageParams) =>
      t('yup.string.datetime_offset', { path: yupFieldPath(params) }),
    datetime_precision: (params: YupMessageParams) =>
      t('yup.string.datetime_precision', {
        path: yupFieldPath(params),
        precision: yupParamText(params.precision),
      }),
    trim: (params: YupMessageParams) => t('yup.string.trim', { path: yupFieldPath(params) }),
    lowercase: (params: YupMessageParams) =>
      t('yup.string.lowercase', { path: yupFieldPath(params) }),
    uppercase: (params: YupMessageParams) =>
      t('yup.string.uppercase', { path: yupFieldPath(params) }),
  },
  number: {
    min: (params: YupMessageParams) =>
      t('yup.number.min', {
        path: yupFieldPath(params),
        min: yupParamText(params.min),
      }),
    max: (params: YupMessageParams) =>
      t('yup.number.max', {
        path: yupFieldPath(params),
        max: yupParamText(params.max),
      }),
    lessThan: (params: YupMessageParams) =>
      t('yup.number.lessThan', {
        path: yupFieldPath(params),
        less: yupParamText(params.less),
      }),
    moreThan: (params: YupMessageParams) =>
      t('yup.number.moreThan', {
        path: yupFieldPath(params),
        more: yupParamText(params.more),
      }),
    positive: (params: YupMessageParams) =>
      t('yup.number.positive', { path: yupFieldPath(params) }),
    negative: (params: YupMessageParams) =>
      t('yup.number.negative', { path: yupFieldPath(params) }),
    integer: (params: YupMessageParams) => t('yup.number.integer', { path: yupFieldPath(params) }),
  },
  date: {
    min: (params: YupMessageParams) =>
      t('yup.date.min', {
        path: yupFieldPath(params),
        min: yupParamText(params.min),
      }),
    max: (params: YupMessageParams) =>
      t('yup.date.max', {
        path: yupFieldPath(params),
        max: yupParamText(params.max),
      }),
  },
  boolean: {
    isValue: (params: YupMessageParams) =>
      t('yup.boolean.isValue', {
        path: yupFieldPath(params),
        value: yupParamText(params.value),
      }),
  },
  object: {
    noUnknown: (params: YupMessageParams) =>
      t('yup.object.noUnknown', {
        path: yupFieldPath(params),
        unknown: yupParamText(params.unknown),
      }),
    exact: (params: YupMessageParams) =>
      t('yup.object.exact', {
        path: yupFieldPath(params),
        properties: yupParamText(params.properties),
      }),
  },
  array: {
    length: (params: YupMessageParams) =>
      t('yup.array.length', {
        path: yupFieldPath(params),
        length: yupParamText(params.length),
      }),
    min: (params: YupMessageParams) =>
      t('yup.array.min', {
        path: yupFieldPath(params),
        min: yupParamText(params.min),
      }),
    max: (params: YupMessageParams) =>
      t('yup.array.max', {
        path: yupFieldPath(params),
        max: yupParamText(params.max),
      }),
  },
  tuple: {
    notType: (params: YupMessageParams) => t('yup.tuple.notType', { path: yupFieldPath(params) }),
  },
};

/**
 * Points Yup's built-in messages at vue-i18n.
 * Each message is resolved when validation runs, so a locale switch applies immediately.
 */
export function setupYupLocale(): void {
  setLocale(yupLocale);
}
