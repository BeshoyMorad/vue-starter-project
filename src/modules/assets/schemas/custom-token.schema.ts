import type { MediaValue } from '@/types/media';
import * as yup from 'yup';

export const customTokenSchema = yup.object({
  logo: yup.mixed<MediaValue>().nullable().optional(),
  networkId: yup.number().typeError('Network is required').required('Network is required'),
  contractAddress: yup.string().trim().required('Contract address is required'),
  name: yup.string().trim().required('Token name is required'),
  symbol: yup.string().trim().required('Token symbol is required'),
  decimals: yup
    .number()
    .typeError('Decimals must be a number')
    .required('Token decimal is required')
    .integer('Decimals must be an integer')
    .min(0, 'Decimals cannot be negative')
    .max(18, 'Decimals cannot exceed 18'),
});

export type CustomTokenFormValues = yup.InferType<typeof customTokenSchema>;
