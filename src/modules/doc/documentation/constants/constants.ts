export const ARCHITECTURE_DOM = {
  title: 'Base Project Architecture',
  description:
    'A complete Vue base project that provides a consistent structure and architecture for building scalable application features.',

  introduction: {
    title: 'What is this project?',
    description:
      'This project provides a reusable foundation for Vue applications. It includes shared components, composables, forms, services, queries, mutations, schemas, and common project conventions so new features can follow the same architecture.',
  },

  structure: {
    title: 'Project Structure',
    description:
      'The project separates shared functionality from feature-specific code. Shared functionality can be reused across features, while each feature keeps its own pages, components, logic, and API-related code together.',
  },
  featureStructure: {
    title: 'Feature Structure',
    description:
      'Feature-specific code is grouped together inside its module. This keeps each feature easier to understand, maintain, and extend.',
  },

  featureArchitecture: {
    title: 'Feature Architecture',
    description:
      'Each feature follows a layered structure. Pages and components use composables for reusable logic, while queries and mutations communicate with services that use the shared API client.',
  },

  newFeature: {
    title: 'Adding a New Feature',
    description:
      'When creating a new feature, follow the existing module structure and reuse shared functionality whenever possible.',
  },

  principles: {
    title: 'Architecture Principles',
    description:
      'These principles keep the project consistent, maintainable, and easier to extend as new features are added.',
  },
} as const;

export const ARCHITECTURE_STRUCTURE_CODE = `📁 src/
├── 📁 assets/
├── 📁 components/
├── 📁 composables/
├── 📁 config/
├── 📁 constants/
├── 📁 css/
├── 📁 layouts/
├── 📁 lib/
├── 📁 locales/
├── 📁 modules/ 
│   ├── 📁 shared/
│   ├── 📁 users/
│   └── 📁 ...
├── 📁 pages/
├── 📁 plugins/
├── 📁 router/
├── 📁 stores/
├── 📁 types/
├── 📁 utils/
├── 📄 App.vue
└── 📄 main.ts`;

export const ARCHITECTURE_FEATURE_CODE = `📁 modules/
└── 📁 users/
    ├── 📁 columns/
    ├── 📁 components/
    ├── 📁 composables/
    ├── 📁 constants/
    ├── 📁 mutations/
    ├── 📁 pages/
    ├── 📁 schemas/
    ├── 📁 services/
    ├── 📄 users.routes.ts
    └── 📄 types.ts`;

export const ARCHITECTURE_STRUCTURE_ITEMS = [
  {
    name: 'assets/',
    description: 'Static assets such as images, icons, and other application resources.',
  },
  {
    name: 'components/',
    description: 'Reusable application-level UI components.',
  },
  {
    name: 'composables/',
    description: 'Reusable application logic and stateful behavior.',
  },
  {
    name: 'config/',
    description: 'Application configuration and environment-related setup.',
  },
  {
    name: 'constants/',
    description: 'Application-wide static values and shared constants.',
  },
  {
    name: 'css/',
    description: 'Global styles and application-wide CSS configuration.',
  },
  {
    name: 'layouts/',
    description: 'Reusable page layouts that define the application structure.',
  },
  {
    name: 'lib/',
    description: 'Shared library configurations and third-party integrations.',
  },
  {
    name: 'locales/',
    description: 'Translation files and localization configuration.',
  },
  {
    name: 'modules/',
    description:
      'Feature modules containing feature-specific pages, components, logic, and API operations.',
  },
  {
    name: 'pages/',
    description: 'Application-level pages that compose layouts and features.',
  },
  {
    name: 'plugins/',
    description: 'Vue and application plugins initialized during application startup.',
  },
  {
    name: 'router/',
    description: 'Application routes, navigation configuration, and route guards.',
  },
  {
    name: 'stores/',
    description: 'Global application state managed with Pinia.',
  },
  {
    name: 'types/',
    description: 'Shared TypeScript types used across the application.',
  },
  {
    name: 'utils/',
    description: 'Small reusable utility functions used across the application.',
  },
  {
    name: 'App.vue',
    description: 'Root application component that defines the main application shell.',
  },
  {
    name: 'main.ts',
    description:
      'Application entry point where Vue, plugins, and global providers are initialized.',
  },
] as const;

export const ARCHITECTURE_FEATURE_ITEMS = [
  {
    name: 'components/',
    description: 'UI components used only by the feature.',
  },
  {
    name: 'composables/',
    description: 'Reusable logic and state specific to the feature.',
  },
  {
    name: 'constants/',
    description: 'Static values and configuration specific to the feature.',
  },
  {
    name: 'mutations/',
    description: 'Write operations that change backend data.',
  },
  {
    name: 'pages/',
    description: 'Route-level pages belonging to the feature.',
  },
  {
    name: 'schemas/',
    description: 'Validation schemas used by feature forms.',
  },
  {
    name: 'services/',
    description: 'API methods used by the feature.',
  },
  {
    name: 'types.ts',
    description: 'TypeScript types shared across the feature.',
  },
  {
    name: 'users.routes.ts',
    description: 'Routes registered for the feature.',
  },
] as const;

export const ARCHITECTURE_QUERY_FLOW_ITEMS = [
  {
    title: 'Page / Component',
    description: 'Requests or displays feature data.',
  },
  {
    title: 'Composable',
    description: 'Connects the UI with the query logic.',
  },
  {
    title: 'Query',
    description: 'Manages server-state fetching and caching.',
  },
  {
    title: 'Service',
    description: 'Defines the API request for the feature.',
  },
  {
    title: 'API Client',
    description: 'Sends the HTTP request with shared configuration.',
  },
  {
    title: 'Backend',
    description: 'Processes the request and returns the response.',
  },
] as const;

export const ARCHITECTURE_MUTATION_FLOW_ITEMS = [
  {
    title: 'Page / Component',
    description: 'Triggers an action such as create, update, or delete.',
  },
  {
    title: 'Composable',
    description: 'Exposes the mutation behavior to the UI.',
  },
  {
    title: 'Mutation',
    description: 'Manages the server-state write operation.',
  },
  {
    title: 'Service',
    description: 'Defines the API request for the operation.',
  },
  {
    title: 'API Client',
    description: 'Sends the HTTP request with shared configuration.',
  },
  {
    title: 'Backend',
    description: 'Processes the operation and updates the data.',
  },
] as const;
export const ARCHITECTURE_FLOWS = [
  {
    key: 'query',
    title: 'Query Flow',
    description: 'Used for reading and fetching server data.',
    items: ARCHITECTURE_QUERY_FLOW_ITEMS,
  },
  {
    key: 'mutation',
    title: 'Mutation Flow',
    description: 'Used for operations that change server data.',
    items: ARCHITECTURE_MUTATION_FLOW_ITEMS,
  },
] as const;
export const ARCHITECTURE_QUERY_FLOW_CODE = `Page / Component
       ↓
   Composable
       ↓
      Query
       ↓
    Service
       ↓
   API Client
       ↓
    Backend`;

export const ARCHITECTURE_MUTATION_FLOW_CODE = `Page / Component
       ↓
   Composable
       ↓
    Mutation
       ↓
    Service
       ↓
   API Client
       ↓
    Backend`;

export const ARCHITECTURE_NEW_FEATURE_STEPS = [
  'Create the feature module',
  'Add the required feature folders',
  'Create pages and feature components',
  'Add types and validation schemas',
  'Create services for API communication',
  'Add queries or mutations when needed',
  'Register the feature routes',
] as const;

export const ARCHITECTURE_NEW_FEATURE_CODE = `📁 modules/
└── 📁 products/
    ├── 📁 components/
    ├── 📁 composables/
    ├── 📁 constants/
    ├── 📁 mutations/
    ├── 📁 pages/
    ├── 📁 schemas/
    ├── 📁 services/
    ├── 📄 products.routes.ts
    └── 📄 types.ts`;

export const ARCHITECTURE_PRINCIPLES = [
  {
    title: 'Feature Isolation',
    description:
      'Keep feature-specific code inside its own module instead of spreading it across the application.',
  },
  {
    title: 'Shared Reusability',
    description:
      'Move functionality used by multiple features into shared components, composables, services, or utilities.',
  },
  {
    title: 'Separation of Concerns',
    description:
      'Keep UI, business logic, API operations, and validation in their appropriate layers.',
  },
  {
    title: 'Consistent Conventions',
    description:
      'Follow the existing project structure when adding new features so the codebase stays predictable.',
  },
] as const;
