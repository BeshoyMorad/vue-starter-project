export const ACCORDION_IMPORT_CODE = `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components';`;

export const ACCORDION_BASIC_CODE = `<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>
      What is Vue?
    </AccordionTrigger>

    <AccordionContent>
      Vue is a progressive JavaScript framework for building user interfaces.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger>
      What is Composition API?
    </AccordionTrigger>

    <AccordionContent>
      Composition API is a set of APIs that allows you to write Vue
      components using imported functions.
    </AccordionContent>
  </AccordionItem>
</Accordion>`;

export const ACCORDION_MULTIPLE_CODE = `<Accordion type="multiple">
  <AccordionItem value="item-1">
    <AccordionTrigger>
      What is Vue?
    </AccordionTrigger>

    <AccordionContent>
      Vue is a progressive JavaScript framework for building user interfaces.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger>
      What is Vite?
    </AccordionTrigger>

    <AccordionContent>
      Vite is a modern frontend build tool.
    </AccordionContent>
  </AccordionItem>
</Accordion>`;

export const ACCORDION_DEFAULT_OPEN_CODE = `<Accordion
  type="single"
  collapsible
  default-value="item-1"
>
  <AccordionItem value="item-1">
    <AccordionTrigger>
      Getting Started
    </AccordionTrigger>

    <AccordionContent>
      This section is opened by default.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger>
      Installation
    </AccordionTrigger>

    <AccordionContent>
      Install the required dependencies.
    </AccordionContent>
  </AccordionItem>
</Accordion>`;

export const ACCORDION_CODE_HEADER = {
  import: 'Import',
  template: 'Template',
};
export const ACCORDION_DOC = {
  title: 'Accordion',
  description:
    'A vertically stacked set of interactive headings that each reveal a section of content.',
  import: {
    title: 'Import',
    description: 'Import the Accordion components from the shared components entry point.',
  },
  examples: {
    title: 'Examples',
    description: 'Explore the different ways to configure and use the Accordion component.',
  },
  basic: {
    title: 'Basic Accordion',
    description: 'Use a single Accordion to allow only one item to be expanded at a time.',
    howToUse: 'Set type to "single" and add collapsible to allow the active item to be closed.',
  },
  multiple: {
    title: 'Multiple Items',
    description: 'Allow multiple Accordion items to remain open at the same time.',
    howToUse: 'Set type to "multiple" to allow users to expand more than one item.',
  },
  defaultOpen: {
    title: 'Default Open',
    description: 'Open a specific Accordion item automatically when the component is rendered.',
    howToUse: 'Use default-value with the value of the AccordionItem you want to open initially.',
  },
};
