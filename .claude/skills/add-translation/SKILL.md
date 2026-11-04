---
name: add-translation
description: Add or change user-facing text in en and ar. Use whenever a component needs a new label, message, placeholder, or error string.
---

# Add translations

Never leave a hard-coded UI string in a template or script.

1. Pick the namespace. Namespaces are the files in `src/locales/en/` (`common`, `auth`, `button`, `dialog`, `nav`, `table`, `tooltip`, `yup`, `demo`). Reuse `common` for generic words. Add a new namespace file only for a new feature area.
2. Add the key to **both** `src/locales/en/<namespace>.json` and `src/locales/ar/<namespace>.json`. The Arabic value must be real Arabic, not a copy of the English text. Keep the key order identical in both files.
3. JSON files have no wrapper object: `common.json` is `{ "save": "Save" }`. Keys are nested only when the existing file nests them.
4. Use `t('<namespace>.<key>')` in code and `$t(...)` in templates. Interpolate with `{name}` placeholders, not string concatenation. Use plural syntax for counts.
5. If you created a new namespace file, add it to `MessageSchema` in `src/locales/messages.ts` (and create the matching `ar` file).
6. Run `pnpm type-check`: it regenerates the locale types and fails on a key that does not exist.

The post-edit hook reports key mismatches between `en` and `ar` as soon as one file is saved.
