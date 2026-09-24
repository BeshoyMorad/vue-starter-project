export const AVATAR_IMPORT_CODE = `import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/components';`;

export const AVATAR_BASIC_CODE = `<Avatar>
  <AvatarImage
    src="https://i.pravatar.cc/150?img=12"
    alt="User avatar"
  />

  <AvatarFallback>
    HK
  </AvatarFallback>
</Avatar>`;

export const AVATAR_CODE_HEADER = {
  import: 'Import',
  script: 'Script',
  template: 'Template',
};

export const AVATAR_FALLBACK_CODE = `<Avatar>
  <AvatarFallback class="bg-primary-500 text-white">
    HK
  </AvatarFallback>
</Avatar>`;

export const AVATAR_SIZE_CODE = `<div class="flex items-center gap-4">
  <Avatar class="size-8">
    <AvatarImage
      src="https://i.pravatar.cc/150?img=12"
      alt="Small avatar"
    />
    <AvatarFallback>
      SM
    </AvatarFallback>
  </Avatar>

  <Avatar class="size-12">
    <AvatarImage
      src="https://i.pravatar.cc/150?img=12"
      alt="Medium avatar"
    />
    <AvatarFallback>
      MD
    </AvatarFallback>
  </Avatar>

  <Avatar class="size-16">
    <AvatarImage
      src="https://i.pravatar.cc/150?img=12"
      alt="Large avatar"
    />
    <AvatarFallback>
      LG
    </AvatarFallback>
  </Avatar>
</div>`;

export const AVATAR_USER_CODE = `<div class="flex items-center gap-3">
  <Avatar class="size-12">
    <AvatarImage
      src="https://i.pravatar.cc/150?img=12"
      alt="Hisham Kamel"
    />
    <AvatarFallback>
      HK
    </AvatarFallback>
  </Avatar>

  <div>
    <p class="font-medium">
      Hisham Kamel
    </p>

    <p class="text-sm text-muted-foreground">
      hisham@example.com
    </p>
  </div>
</div>`;

export const AVATAR_DOC = {
  title: 'Avatar',

  description:
    "An avatar component for displaying a user's profile image with a fallback when the image is unavailable.",

  import: {
    title: 'Import',
    description: 'Import the Avatar components from the shared components library.',
  },

  examples: {
    title: 'Examples',
    description: 'Common usage examples of the Avatar component.',
  },

  basic: {
    title: 'Basic',
    description: 'Display an avatar image with a fallback value.',
    howToUse:
      'Use AvatarImage for the profile image and AvatarFallback for the content displayed when the image is unavailable.',

    image: {
      src: 'https://i.pravatar.cc/150?img=12',
      alt: 'User avatar',
    },

    fallback: 'HK',
  },

  fallback: {
    title: 'Fallback',
    description: 'Display initials or custom content without using a profile image.',
    howToUse: 'Use AvatarFallback inside Avatar when no profile image is available.',

    fallback: 'HK',
  },

  size: {
    title: 'Custom Size',
    description: 'Customize the avatar size using Tailwind CSS utility classes.',
    howToUse:
      'Pass a size utility class such as size-8, size-12, or size-16 to the Avatar component.',

    image: {
      src: 'https://i.pravatar.cc/150?img=12',

      small: {
        alt: 'Small avatar',
        fallback: 'SM',
      },

      medium: {
        alt: 'Medium avatar',
        fallback: 'MD',
      },

      large: {
        alt: 'Large avatar',
        fallback: 'LG',
      },
    },
  },

  user: {
    title: 'User Profile',
    description: 'Combine an avatar with user information to create a profile display.',
    howToUse: 'Use the Avatar component alongside text content such as the user name and email.',

    image: {
      src: 'https://i.pravatar.cc/150?img=12',
      alt: 'Hisham Kamel',
    },

    fallback: 'HK',
    name: 'Hisham Kamel',
    email: 'hisham@example.com',
  },
};
