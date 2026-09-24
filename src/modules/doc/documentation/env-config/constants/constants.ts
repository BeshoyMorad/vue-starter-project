export const ENV_DOM = {
  title: 'Environment Variables',

  description:
    'Environment variables provide configuration values for the application. This project validates them centrally through src/config/env.ts and exposes the final values through the config object.',

  structure: {
    title: 'Environment Configuration',
    description:
      'The .env file contains the environment values, while src/config/env.ts validates these values and exposes them as a centralized configuration object.',
  },

  setup: {
    title: 'Environment File Setup',
    description:
      'The project reads environment values from a .env file located at the project root. New developers need to make sure the required variables exist before running the application.',

    howToUse:
      'Create or update the .env file in the project root, add the required VITE_ variables, then run the application. The values are automatically picked up by import.meta.env and validated by env.ts.',
  },

  validation: {
    title: 'Environment Validation',
    description:
      'src/config/env.ts uses Yup to define the expected environment variables and validate their values before the application starts.',

    howToUse:
      'The schema defines which variables are required, which values are allowed, and which values have defaults. The raw import.meta.env object is then validated before the application configuration is created.',
  },

  usage: {
    title: 'Using the Configuration',
    description:
      'After validation, the environment values are exposed through the config object. Application code should use config instead of accessing import.meta.env directly.',

    howToUse:
      'Import config from @/config/env and use the required configuration value, such as config.apiBaseUrl or config.env.',
  },

  errors: {
    title: 'Validation Errors',
    description:
      'If an environment variable is missing or has an invalid value, the validation fails, the errors are printed in the console, and the application does not continue starting.',
  },
} as const;

export const ENV_IMPORT_CODE = `import { config } from '@/config/env';`;

export const ENV_PROJECT_STRUCTURE = `
📁 project-root/
├── 📄 .env
├── 📁 src/
│   └── 📁 config/
│       └── 📄 env.ts
├── 📁 package.json
└── 📁 vite.config.ts
`;

export const ENV_SETUP_CODE = `# .env

VITE_API_BASE_URL=https://api.example.com
VITE_APP_ENV=development
VITE_ENABLE_DEVTOOLS=true`;

export const ENV_SCHEMA_CODE = `import * as yup from 'yup';

const envSchema = yup.object({
  VITE_API_BASE_URL: yup
    .string()
    .url('VITE_API_BASE_URL must be a valid URL')
    .required(),

  VITE_APP_ENV: yup
    .string()
    .oneOf(['development', 'production', 'staging'])
    .default('development'),

  VITE_ENABLE_DEVTOOLS: yup
    .string()
    .transform((val) => String(val) === 'true')
    .default('false'),
});`;

export const ENV_VALIDATION_CODE = `let validatedEnv: yup.InferType<typeof envSchema>;

try {
  validatedEnv = envSchema.validateSync(import.meta.env, {
    abortEarly: false,
    stripUnknown: true,
  });
} catch (error) {
  if (error instanceof yup.ValidationError) {
    console.error('❌ Invalid or missing Environment Variables:');

    error.inner.forEach((err) => {
      console.error(\`   - \${err.path}: \${err.message}\`);
    });
  }

  throw new Error(
    'Fix environment variables before starting the application.',
    { cause: error },
  );
}`;

export const ENV_USAGE_CODE = `import { config } from '@/config/env';

const apiBaseUrl = config.apiBaseUrl;
const environment = config.env;
const enableDevtools = config.enableDevtools;`;

export const ENV_ERROR_CODE = `❌ Invalid or missing Environment Variables:
   - VITE_API_BASE_URL: VITE_API_BASE_URL must be a valid URL

Error: Fix environment variables before starting the application.`;
