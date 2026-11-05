export interface DocItem {
  name: string;
  description: string;
}

export interface DocCode {
  code: string;
  header?: string;
}

export interface DocSection {
  title: string;
  description?: string;
  howToUse?: string;
  header?: string;
  code?: string;
  codeArr?: readonly DocCode[];
  structure?: string;
  items?: readonly DocItem[];
}

export interface DocPageContent {
  title: string;
  description: string;
  sections: readonly DocSection[];
}
