import type { LocaleCode } from './config';

import type common from './en/common.json';
import type nav from './en/nav.json';
import type demo from './en/demo.json';
import type auth from './en/auth.json';
import type button from './en/button.json';
import type tooltip from './en/tooltip.json';
import type dialog from './en/dialog.json';
import type table from './en/table.json';
import type yup from './en/yup.json';

/** Typed English message tree. Keep in sync with `src/locales/en/*.json`. */
export interface MessageSchema {
  common: typeof common;
  nav: typeof nav;
  demo: typeof demo;
  auth: typeof auth;
  button: typeof button;
  tooltip: typeof tooltip;
  dialog: typeof dialog;
  table: typeof table;
  yup: typeof yup;
}

type LocaleJsonModule = Record<string, unknown>;

const localeFileLoaders = import.meta.glob<LocaleJsonModule>('./*/*.json', {
  import: 'default',
});

const enFiles = import.meta.glob<LocaleJsonModule>('./en/*.json', {
  eager: true,
  import: 'default',
});

function namespaceFromPath(path: string, locale: LocaleCode): string {
  const prefix = `./${locale}/`;
  if (!path.startsWith(prefix) || !path.endsWith('.json')) {
    throw new Error(`[i18n] Unexpected locale file path: ${path}`);
  }

  return path.slice(prefix.length, -'.json'.length);
}

function mergeLocaleFiles(
  files: Record<string, LocaleJsonModule>,
  locale: LocaleCode
): MessageSchema {
  return Object.fromEntries(
    Object.entries(files).map(([path, messages]) => [namespaceFromPath(path, locale), messages])
  ) as unknown as MessageSchema;
}

export const enMessages = mergeLocaleFiles(enFiles, 'en');

export async function loadLocaleFileMessages(locale: LocaleCode): Promise<MessageSchema> {
  const prefix = `./${locale}/`;
  const matched = Object.entries(localeFileLoaders).filter(([path]) => path.startsWith(prefix));

  if (matched.length === 0) {
    throw new Error(`[i18n] No message files found for locale "${locale}"`);
  }

  const entries = await Promise.all(
    matched.map(async ([path, loader]) => {
      return [namespaceFromPath(path, locale), await loader()] as const;
    })
  );

  return Object.fromEntries(entries) as unknown as MessageSchema;
}
