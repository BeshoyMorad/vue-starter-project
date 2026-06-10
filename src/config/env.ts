import * as yup from 'yup';

// 1. Define the schema matching your expected variables
const envSchema = yup.object({
  VITE_API_BASE_URL: yup.string().url('VITE_API_BASE_URL must be a valid URL').required(),
  VITE_APP_ENV: yup.string().oneOf(['development', 'production', 'staging']).default('development'),
  VITE_ENABLE_DEVTOOLS: yup
    .string()
    .transform((val) => String(val) === 'true')
    .default('false'),
});

// 2. Validate the raw import.meta.env object
let validatedEnv: yup.InferType<typeof envSchema>;

try {
  validatedEnv = envSchema.validateSync(import.meta.env, {
    abortEarly: false, // Catch ALL errors at once, not just the first one
    stripUnknown: true, // Remove variables we didn't explicitly define here
  });
} catch (error) {
  if (error instanceof yup.ValidationError) {
    console.error('❌ Invalid or missing Environment Variables:');
    error.inner.forEach((err) => {
      console.error(`   - ${err.path}: ${err.message}`);
    });
  }
  throw new Error('Fix environment variables before starting the application.', { cause: error });
}

// 3. Export the strongly typed config object
export const config = {
  apiBaseUrl: validatedEnv.VITE_API_BASE_URL,
  env: validatedEnv.VITE_APP_ENV,
  enableDevtools: validatedEnv.VITE_ENABLE_DEVTOOLS === 'true',
} as const;
