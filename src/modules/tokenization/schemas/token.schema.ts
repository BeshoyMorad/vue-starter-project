import * as yup from 'yup';
import type { StepDefinition } from '@/components/form/multi-step-form/types';
import type { MediaValue } from '@/types/media';
import { NFT_TOKEN_TYPE } from '@/modules/tokenization/constants/config';

export const step1Fields = [
  'image',
  'networkId',
  'type',
  'isCollection',
  'gasStationCategoryId',
  'name',
  'symbol',
  'initialSupply',
  'decimals',
];

export const step2Fields = [
  'vaultId',
  'ownerAddress',
  'parentId',
  'recipientAddress',
  'description',
  'canBurn',
  'canMint',
  'canPause',
  'document',
  'metaPairs',
];

export const step1Schema = yup.object({
  image: yup.mixed<MediaValue>().required('Token image is required'),
  networkId: yup.number().required('Network is required'),
  type: yup.number().required('Token type is required'),
  isCollection: yup.boolean().default(false),
  gasStationCategoryId: yup.number().required('Gas station is required'),
  name: yup.string().trim().required('Token name is required'),
  symbol: yup.string().trim().required('Token symbol is required'),
  initialSupply: yup
    .number()
    .nullable()
    .optional()
    .when('type', {
      is: (val: number) => val !== NFT_TOKEN_TYPE,
      then: (schema) =>
        schema.min(0, 'Initial supply must be positive').required('Initial supply is required'),
    }),
  decimals: yup
    .number()
    .nullable()
    .optional()
    .when('type', {
      is: (val: number) => val !== NFT_TOKEN_TYPE,
      then: (schema) => schema.min(0, 'Decimals must be positive').required('Decimals is required'),
    }),
});

export const step2Schema = yup.object({
  vaultId: yup.number().nullable().optional(),
  ownerAddress: yup.string().trim().required('Owner address is required'),
  parentId: yup.number().nullable().optional(),
  recipientAddress: yup.string().trim().nullable().optional(),
  description: yup.string().trim().nullable().optional(),
  canBurn: yup.boolean().default(false),
  canMint: yup.boolean().default(false),
  canPause: yup.boolean().default(false),
  document: yup.string().trim().nullable().optional(),
  metaPairs: yup
    .array(
      yup.object({
        key: yup.string().default(''),
        value: yup.string().default(''),
      })
    )
    .default([{ key: '', value: '' }])
    .optional(),
});

export const createTokenSchema = step1Schema.concat(step2Schema);

export type CreateTokenFormValues = yup.InferType<typeof createTokenSchema>;

export const createTokenSteps: StepDefinition[] = [
  {
    title: 'Basic Settings',
    description: 'Enter token details & asset image',
    fields: step1Fields,
    schema: step1Schema,
  },
  {
    title: 'Token Configuration',
    description: 'Enter token configuration settings',
    fields: step2Fields,
    schema: step2Schema,
  },
];
