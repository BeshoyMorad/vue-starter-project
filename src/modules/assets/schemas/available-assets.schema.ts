import * as yup from 'yup';

export const availableAssetsSchema = yup
  .object({
    networkId: yup.number().nullable().optional(),
    isSelectAll: yup.boolean().default(false),
    selectedIds: yup.array().of(yup.number().required()).default([]),
  })
  .test('at-least-one', 'Please select at least one asset to add.', (values) => {
    return !!(values.isSelectAll || (values.selectedIds && values.selectedIds.length > 0));
  });

export type AvailableAssetsFormValues = yup.InferType<typeof availableAssetsSchema>;
