<script setup lang="ts">
  import { ref } from 'vue';

  import Card from '@/components/card/ExampleCard.vue';

  import Button from '@/components/ui/button/Button.vue';

  import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from '@/components';

  import {
    DROPDOWN_MENU_IMPORT_CODE,
    DROPDOWN_MENU_BASIC_CODE,
    DROPDOWN_MENU_GROUP_CODE,
    DROPDOWN_MENU_CHECKBOX_RADIO_CODE,
    DROPDOWN_MENU_SUBMENU_CODE,
    DROPDOWN_MENU_DOC,
    DROPDOWN_MENU_CODE_HEADER,
  } from '../constants/constants';

  const showStatusBar = ref(true);
  const position = ref('bottom');
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ DROPDOWN_MENU_DOC.title }}
      </h1>

      <p class="text-text-secondary text-sm leading-6">
        {{ DROPDOWN_MENU_DOC.description }}
      </p>
    </section>

    <!-- Import -->
    <Card
      :title="DROPDOWN_MENU_DOC.import.title"
      :description="DROPDOWN_MENU_DOC.import.description"
      :code="DROPDOWN_MENU_IMPORT_CODE"
      :header="DROPDOWN_MENU_CODE_HEADER.import"
      :show-preview="false"
    />

    <!-- Examples -->
    <section class="space-y-4">
      <div>
        <h2 class="text-text-primary text-xl font-semibold">
          {{ DROPDOWN_MENU_DOC.examples.title }}
        </h2>

        <p class="text-text-secondary mt-1 text-sm">
          {{ DROPDOWN_MENU_DOC.examples.description }}
        </p>
      </div>

      <div class="space-y-5">
        <!-- Basic -->
        <Card
          :title="DROPDOWN_MENU_DOC.basic.title"
          :description="DROPDOWN_MENU_DOC.basic.description"
          :how-to-use="DROPDOWN_MENU_DOC.basic.howToUse"
          :header="DROPDOWN_MENU_CODE_HEADER.template"
          :code-arr="[
            {
              code: DROPDOWN_MENU_BASIC_CODE,
              header: DROPDOWN_MENU_CODE_HEADER.template,
            },
          ]"
        >
          <template #preview>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button test-id=""> Open Menu </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuItem test-id=""> Profile </DropdownMenuItem>

                <DropdownMenuItem test-id=""> Settings </DropdownMenuItem>

                <DropdownMenuItem test-id=""> Logout </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </template>
        </Card>

        <!-- Group -->
        <Card
          :title="DROPDOWN_MENU_DOC.group.title"
          :description="DROPDOWN_MENU_DOC.group.description"
          :how-to-use="DROPDOWN_MENU_DOC.group.howToUse"
          :header="DROPDOWN_MENU_CODE_HEADER.template"
          :code-arr="[
            {
              code: DROPDOWN_MENU_GROUP_CODE,
              header: DROPDOWN_MENU_CODE_HEADER.template,
            },
          ]"
        >
          <template #preview>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button test-id=""> Account </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel> My Account </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem test-id="">
                    Profile

                    <DropdownMenuShortcut> ⇧⌘P </DropdownMenuShortcut>
                  </DropdownMenuItem>

                  <DropdownMenuItem test-id="">
                    Settings

                    <DropdownMenuShortcut> ⌘, </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem test-id="">
                  Logout

                  <DropdownMenuShortcut> ⇧⌘Q </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </template>
        </Card>

        <!-- Checkbox / Radio -->
        <Card
          :title="DROPDOWN_MENU_DOC.checkboxRadio.title"
          :description="DROPDOWN_MENU_DOC.checkboxRadio.description"
          :how-to-use="DROPDOWN_MENU_DOC.checkboxRadio.howToUse"
          :header="DROPDOWN_MENU_CODE_HEADER.script"
          :code-arr="[
            {
              code: DROPDOWN_MENU_CHECKBOX_RADIO_CODE.script,
              header: DROPDOWN_MENU_CODE_HEADER.script,
            },
            {
              code: DROPDOWN_MENU_CHECKBOX_RADIO_CODE.template,
              header: DROPDOWN_MENU_CODE_HEADER.template,
            },
          ]"
        >
          <template #preview>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button test-id=""> Preferences </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel> Appearance </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuCheckboxItem v-model="showStatusBar">
                  Show Status Bar
                </DropdownMenuCheckboxItem>

                <DropdownMenuSeparator />

                <DropdownMenuLabel> Position </DropdownMenuLabel>

                <DropdownMenuRadioGroup v-model="position">
                  <DropdownMenuRadioItem value="top"> Top </DropdownMenuRadioItem>

                  <DropdownMenuRadioItem value="bottom"> Bottom </DropdownMenuRadioItem>

                  <DropdownMenuRadioItem value="right"> Right </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </template>
        </Card>

        <!-- Submenu -->
        <Card
          :title="DROPDOWN_MENU_DOC.submenu.title"
          :description="DROPDOWN_MENU_DOC.submenu.description"
          :how-to-use="DROPDOWN_MENU_DOC.submenu.howToUse"
          :header="DROPDOWN_MENU_CODE_HEADER.template"
          :code-arr="[
            {
              code: DROPDOWN_MENU_SUBMENU_CODE,
              header: DROPDOWN_MENU_CODE_HEADER.template,
            },
          ]"
        >
          <template #preview>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button test-id=""> Open Menu </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuItem test-id=""> Profile </DropdownMenuItem>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger> More Options </DropdownMenuSubTrigger>

                  <DropdownMenuSubContent>
                    <DropdownMenuItem test-id=""> Share </DropdownMenuItem>

                    <DropdownMenuItem test-id=""> Duplicate </DropdownMenuItem>

                    <DropdownMenuItem test-id=""> Archive </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuSeparator />

                <DropdownMenuItem test-id=""> Logout </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>
