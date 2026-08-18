<script setup lang="ts">
  import { ref, computed } from 'vue';
  import type { Editor } from '@tiptap/vue-3';
  import { Button, Tooltip, Icon } from '@/components';
  import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
  import { Input } from '@/components/ui/input';
  import { cn } from '@/utils';
  import {
    type ToolbarItem,
    getHistoryGroup,
    getHeadingsGroup,
    getMarksGroup,
    getBlocksGroup,
  } from './toolbar-items';

  const props = withDefaults(
    defineProps<{
      editor?: Editor;
      disabled?: boolean;
      testId: string;
    }>(),
    {
      editor: undefined,
      disabled: false,
    }
  );

  const isLinkOpen = ref(false);
  const linkUrl = ref('');

  function openLinkPopover() {
    if (!props.editor) return;
    const previousUrl = props.editor.getAttributes('link').href || '';
    linkUrl.value = previousUrl;
    isLinkOpen.value = true;
  }

  function applyLink() {
    if (!props.editor) return;
    if (linkUrl.value.trim() === '') {
      props.editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      let formattedUrl = linkUrl.value.trim();
      if (!/^https?:\/\//i.test(formattedUrl) && !/^mailto:/i.test(formattedUrl)) {
        formattedUrl = `https://${formattedUrl}`;
      }
      props.editor.chain().focus().extendMarkRange('link').setLink({ href: formattedUrl }).run();
    }
    isLinkOpen.value = false;
  }

  function removeLink() {
    if (!props.editor) return;
    props.editor.chain().focus().extendMarkRange('link').unsetLink().run();
    linkUrl.value = '';
    isLinkOpen.value = false;
  }

  const groups = computed<ToolbarItem[][]>(() => {
    const ed = props.editor;
    if (!ed) return [];
    return [getHistoryGroup(ed), getHeadingsGroup(ed), getMarksGroup(ed), getBlocksGroup(ed)];
  });
</script>

<template>
  <div
    v-if="editor"
    class="bg-background-surface/50 border-border-disabled/50 flex flex-wrap items-center gap-1 rounded-t-xl border-b p-1.5"
  >
    <template v-for="(group, groupIndex) in groups" :key="groupIndex">
      <div class="flex items-center gap-0.5">
        <Tooltip v-for="item in group" :key="item.id">
          <template #trigger>
            <Button
              type="button"
              :variant="item.isActive?.() ? 'secondary' : 'ghost'"
              size="icon-sm"
              :disabled="disabled || (item.disabled ? item.disabled() : false)"
              :test-id="`${testId}-${item.id}-btn`"
              :class="
                cn(
                  'size-7 p-0',
                  item.isActive?.() && 'bg-primary/20 text-primary-400 font-bold',
                  item.class
                )
              "
              @click="item.action()"
            >
              <Icon :icon="item.icon" />
            </Button>
          </template>
          {{ item.label }}
        </Tooltip>
      </div>

      <div class="bg-border-disabled/50 mx-1 h-4 w-px" />
    </template>

    <!-- Link & Clear Formatting -->
    <div class="flex items-center gap-0.5">
      <Popover v-model:open="isLinkOpen">
        <PopoverTrigger as-child>
          <div>
            <Tooltip>
              <template #trigger>
                <Button
                  type="button"
                  :variant="editor.isActive('link') ? 'secondary' : 'ghost'"
                  size="icon-sm"
                  :disabled="disabled"
                  :test-id="`${testId}-link-btn`"
                  :class="
                    cn(
                      'size-7 p-0',
                      editor.isActive('link') && 'bg-primary/20 text-primary-400 font-bold'
                    )
                  "
                  @click="openLinkPopover"
                >
                  <Icon icon="hugeicons--link-01" />
                </Button>
              </template>
              Link
            </Tooltip>
          </div>
        </PopoverTrigger>

        <PopoverContent class="w-80 p-3" align="start">
          <div class="space-y-3">
            <div class="text-foreground text-xs font-semibold">Insert or Edit Link</div>
            <Input
              v-model="linkUrl"
              placeholder="https://example.com"
              class="h-9 text-xs"
              @keydown.enter.prevent="applyLink"
            />
            <div class="flex items-center justify-end gap-2">
              <Button
                v-if="editor.isActive('link')"
                type="button"
                variant="danger-outline"
                size="sm"
                :test-id="`${testId}-link-remove-btn`"
                class="h-7 px-2 text-xs"
                @click="removeLink"
              >
                Remove
              </Button>
              <Button
                type="button"
                variant="default"
                size="sm"
                :test-id="`${testId}-link-apply-btn`"
                class="h-7 px-3 text-xs"
                @click="applyLink"
              >
                Apply
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Tooltip>
        <template #trigger>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            :disabled="disabled"
            :test-id="`${testId}-clear-formatting-btn`"
            class="size-7 p-0"
            @click="editor.chain().focus().clearNodes().unsetAllMarks().run()"
          >
            <Icon icon="hugeicons--text-clear" />
          </Button>
        </template>
        Clear Formatting
      </Tooltip>
    </div>
  </div>
</template>
