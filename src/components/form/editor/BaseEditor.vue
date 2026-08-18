<script setup lang="ts">
  import { watch, type HTMLAttributes } from 'vue';
  import { useEditor, EditorContent } from '@tiptap/vue-3';
  import StarterKit from '@tiptap/starter-kit';
  import Underline from '@tiptap/extension-underline';
  import Link from '@tiptap/extension-link';
  import Placeholder from '@tiptap/extension-placeholder';
  import { cn } from '@/utils';
  import EditorToolbar from './EditorToolbar.vue';
  import './editor.css';

  defineOptions({
    inheritAttrs: false,
  });

  interface Props {
    testId: string;
    modelValue?: string;
    defaultValue?: string;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    minHeight?: string;
    maxHeight?: string;
    class?: HTMLAttributes['class'];
    invalid?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: undefined,
    defaultValue: '',
    placeholder: 'Type content here...',
    disabled: false,
    readonly: false,
    minHeight: '160px',
    maxHeight: '480px',
    class: '',
    invalid: false,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'blur', event: Event): void;
    (e: 'focus', event: Event): void;
  }>();

  const editor = useEditor({
    content: props.modelValue ?? props.defaultValue,
    editable: !props.disabled && !props.readonly,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class:
            'text-foreground-link underline underline-offset-2 hover:opacity-80 transition-opacity',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
      Placeholder.configure({
        placeholder: () => props.placeholder,
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    onUpdate: ({ editor: ed }) => {
      const html = ed.isEmpty ? '' : ed.getHTML();
      emits('update:modelValue', html);
    },
    onBlur: ({ event }) => {
      emits('blur', event);
    },
    onFocus: ({ event }) => {
      emits('focus', event);
    },
  });

  // Keep editor content in sync when modelValue updates externally
  watch(
    () => props.modelValue,
    (newVal) => {
      if (!editor.value) return;
      const currentHtml = editor.value.isEmpty ? '' : editor.value.getHTML();
      if ((newVal ?? '') !== currentHtml) {
        editor.value.commands.setContent(newVal ?? '', { emitUpdate: false });
      }
    }
  );

  // Sync disabled & readonly states
  watch(
    () => [props.disabled, props.readonly],
    ([disabled, readonly]) => {
      editor.value?.setEditable(!disabled && !readonly);
    }
  );
</script>

<template>
  <div
    :data-test-id="testId"
    :class="
      cn(
        'bg-background text-foreground relative flex w-full flex-col rounded-xl border-[1.5px] transition-colors',
        'border-border-disabled hover:border-border-primary focus-within:border-border-primary focus-within:ring-border-primary focus-within:ring-2',
        invalid &&
          'border-danger hover:border-danger focus-within:border-danger focus-within:ring-danger/20',
        disabled &&
          'bg-background-disabled hover:border-border-disabled cursor-not-allowed opacity-60',
        props.class
      )
    "
  >
    <!-- Toolbar -->
    <EditorToolbar
      v-if="editor && !readonly"
      :editor="editor"
      :disabled="disabled"
      :test-id="testId"
    />

    <!-- Editor Body -->
    <div
      class="editor-content-wrapper overflow-y-auto px-4 py-3 text-sm"
      :style="{ minHeight: minHeight, maxHeight: maxHeight }"
      @click="editor?.chain().focus().run()"
    >
      <EditorContent :editor="editor" class="tiptap-container h-full focus:outline-none" />
    </div>
  </div>
</template>
