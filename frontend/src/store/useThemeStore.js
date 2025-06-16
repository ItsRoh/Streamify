import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("streamify-theme") || "Valentine",
  setTheme: (theme) => {
    //save the theme even after refreshing
    localStorage.setItem("streamify-theme", theme);
    set({ theme });
  },
}));