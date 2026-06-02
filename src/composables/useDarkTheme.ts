import { useDark, useToggle } from "@vueuse/core";

const DARK_THEME_STORAGE_KEY = "vue-starter-theme";

export const useDarkTheme = () => {
  const isDark = useDark({
    selector: "html",
    attribute: "data-theme",
    valueDark: "dark",
    valueLight: "light",
    storageKey: DARK_THEME_STORAGE_KEY,
    initialValue: "light",
  });

  const toggleDark = useToggle(isDark);

  return { isDark, toggleDark };
};
