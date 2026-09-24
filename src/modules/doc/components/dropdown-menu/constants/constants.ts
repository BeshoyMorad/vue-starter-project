export const DROPDOWN_MENU_IMPORT_CODE = `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components';`;

export const DROPDOWN_MENU_BASIC_CODE = `<DropdownMenu>
  <DropdownMenuTrigger as-child>
    <Button>
      Open Menu
    </Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent>
    <DropdownMenuItem>
      Profile
    </DropdownMenuItem>

    <DropdownMenuItem>
      Settings
    </DropdownMenuItem>

    <DropdownMenuItem>
      Logout
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;

export const DROPDOWN_MENU_GROUP_CODE = `<DropdownMenu>
  <DropdownMenuTrigger as-child>
    <Button>
      Account
    </Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent>
    <DropdownMenuLabel>
      My Account
    </DropdownMenuLabel>

    <DropdownMenuSeparator />

    <DropdownMenuGroup>
      <DropdownMenuItem>
        Profile

        <DropdownMenuShortcut>
          ⇧⌘P
        </DropdownMenuShortcut>
      </DropdownMenuItem>

      <DropdownMenuItem>
        Settings

        <DropdownMenuShortcut>
          ⌘,
        </DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuGroup>

    <DropdownMenuSeparator />

    <DropdownMenuItem>
      Logout

      <DropdownMenuShortcut>
        ⇧⌘Q
      </DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;

export const DROPDOWN_MENU_CHECKBOX_RADIO_CODE = {
  script: `import { ref } from 'vue';

const showStatusBar = ref(true);
const position = ref('bottom');`,

  template: `<DropdownMenu>
  <DropdownMenuTrigger as-child>
    <Button>
      Preferences
    </Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent>
    <DropdownMenuLabel>
      Appearance
    </DropdownMenuLabel>

    <DropdownMenuSeparator />

    <DropdownMenuCheckboxItem v-model="showStatusBar">
      Show Status Bar
    </DropdownMenuCheckboxItem>

    <DropdownMenuSeparator />

    <DropdownMenuLabel>
      Position
    </DropdownMenuLabel>

    <DropdownMenuRadioGroup v-model="position">
      <DropdownMenuRadioItem value="top">
        Top
      </DropdownMenuRadioItem>

      <DropdownMenuRadioItem value="bottom">
        Bottom
      </DropdownMenuRadioItem>

      <DropdownMenuRadioItem value="right">
        Right
      </DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>`,
};

export const DROPDOWN_MENU_SUBMENU_CODE = `<DropdownMenu>
  <DropdownMenuTrigger as-child>
    <Button>
      Open Menu
    </Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent>
    <DropdownMenuItem>
      Profile
    </DropdownMenuItem>

    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        More Options
      </DropdownMenuSubTrigger>

      <DropdownMenuSubContent>
        <DropdownMenuItem>
          Share
        </DropdownMenuItem>

        <DropdownMenuItem>
          Duplicate
        </DropdownMenuItem>

        <DropdownMenuItem>
          Archive
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>

    <DropdownMenuSeparator />

    <DropdownMenuItem>
      Logout
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;

export const DROPDOWN_MENU_CODE_HEADER = {
  import: 'Import',
  script: 'Script',
  template: 'Template',
};

export const DROPDOWN_MENU_DOC = {
  title: 'Dropdown Menu',

  description:
    'Displays a menu to the user, such as a set of actions or functions, triggered by a button or another interactive element.',

  import: {
    title: 'Import',
    description: 'Import the Dropdown Menu components from the shared components entry point.',
  },

  examples: {
    title: 'Examples',
    description: 'Explore the different ways to build and configure Dropdown Menus.',
  },

  basic: {
    title: 'Basic Dropdown Menu',
    description: 'A simple dropdown menu containing a list of actions.',

    howToUse:
      'Wrap the menu with DropdownMenu, use DropdownMenuTrigger to open it, and place the menu items inside DropdownMenuContent.',
  },

  group: {
    title: 'Groups and Shortcuts',
    description:
      'Organize related menu items using groups, labels, separators, and keyboard shortcuts.',

    howToUse:
      'Use DropdownMenuGroup to group related items, DropdownMenuLabel for section titles, DropdownMenuSeparator for visual separation, and DropdownMenuShortcut to display keyboard shortcuts.',
  },

  checkboxRadio: {
    title: 'Checkbox and Radio Items',
    description:
      'Use checkbox and radio items when users need to select or toggle options directly from the menu.',

    howToUse:
      'Bind DropdownMenuCheckboxItem and DropdownMenuRadioGroup to reactive state using v-model.',
  },

  submenu: {
    title: 'Submenu',
    description:
      'Create nested menus when additional actions need to be organized under a parent menu item.',

    howToUse:
      'Use DropdownMenuSub with DropdownMenuSubTrigger and DropdownMenuSubContent to create a nested menu.',
  },
};
