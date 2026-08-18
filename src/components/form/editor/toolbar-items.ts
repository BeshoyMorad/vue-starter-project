import type { Editor } from '@tiptap/vue-3';

export interface ToolbarItem {
  id: string;
  label: string;
  icon: string;
  action: () => void;
  isActive?: () => boolean;
  disabled?: () => boolean;
  class?: string;
}

export function getHistoryGroup(ed: Editor): ToolbarItem[] {
  return [
    {
      id: 'undo',
      label: 'Undo (Ctrl+Z)',
      icon: 'hugeicons--undo-02',
      action: () => ed.chain().focus().undo().run(),
      disabled: () => !ed.can().undo(),
    },
    {
      id: 'redo',
      label: 'Redo (Ctrl+Y)',
      icon: 'hugeicons--redo-02',
      action: () => ed.chain().focus().redo().run(),
      disabled: () => !ed.can().redo(),
    },
  ];
}

export function getHeadingsGroup(ed: Editor): ToolbarItem[] {
  return [
    {
      id: 'paragraph',
      label: 'Paragraph',
      icon: 'hugeicons--text',
      action: () => ed.chain().focus().setParagraph().run(),
      isActive: () => ed.isActive('paragraph') && !ed.isActive('heading'),
    },
    {
      id: 'h1',
      label: 'Heading 1',
      icon: 'hugeicons--heading-01',
      action: () => ed.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => ed.isActive('heading', { level: 1 }),
      class: 'font-bold',
    },
    {
      id: 'h2',
      label: 'Heading 2',
      icon: 'hugeicons--heading-02',
      action: () => ed.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => ed.isActive('heading', { level: 2 }),
      class: 'font-bold',
    },
    {
      id: 'h3',
      label: 'Heading 3',
      icon: 'hugeicons--heading-03',
      action: () => ed.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => ed.isActive('heading', { level: 3 }),
      class: 'font-bold',
    },
  ];
}

export function getMarksGroup(ed: Editor): ToolbarItem[] {
  return [
    {
      id: 'bold',
      label: 'Bold (Ctrl+B)',
      icon: 'hugeicons--text-bold',
      action: () => ed.chain().focus().toggleBold().run(),
      isActive: () => ed.isActive('bold'),
    },
    {
      id: 'italic',
      label: 'Italic (Ctrl+I)',
      icon: 'hugeicons--text-italic',
      action: () => ed.chain().focus().toggleItalic().run(),
      isActive: () => ed.isActive('italic'),
    },
    {
      id: 'underline',
      label: 'Underline (Ctrl+U)',
      icon: 'hugeicons--text-underline',
      action: () => ed.chain().focus().toggleUnderline().run(),
      isActive: () => ed.isActive('underline'),
    },
    {
      id: 'strike',
      label: 'Strikethrough',
      icon: 'hugeicons--text-strikethrough',
      action: () => ed.chain().focus().toggleStrike().run(),
      isActive: () => ed.isActive('strike'),
    },
    {
      id: 'code',
      label: 'Inline Code',
      icon: 'hugeicons--code',
      action: () => ed.chain().focus().toggleCode().run(),
      isActive: () => ed.isActive('code'),
    },
  ];
}

export function getBlocksGroup(ed: Editor): ToolbarItem[] {
  return [
    {
      id: 'bullet-list',
      label: 'Bullet List',
      icon: 'hugeicons--left-to-right-list-bullet',
      action: () => ed.chain().focus().toggleBulletList().run(),
      isActive: () => ed.isActive('bulletList'),
    },
    {
      id: 'ordered-list',
      label: 'Numbered List',
      icon: 'hugeicons--left-to-right-list-number',
      action: () => ed.chain().focus().toggleOrderedList().run(),
      isActive: () => ed.isActive('orderedList'),
    },
    {
      id: 'blockquote',
      label: 'Quote',
      icon: 'hugeicons--quote-up',
      action: () => ed.chain().focus().toggleBlockquote().run(),
      isActive: () => ed.isActive('blockquote'),
    },
    {
      id: 'code-block',
      label: 'Code Block',
      icon: 'hugeicons--code-folder',
      action: () => ed.chain().focus().toggleCodeBlock().run(),
      isActive: () => ed.isActive('codeBlock'),
    },
    {
      id: 'hr',
      label: 'Horizontal Line',
      icon: 'hugeicons--border-horizontal',
      action: () => ed.chain().focus().setHorizontalRule().run(),
    },
  ];
}
