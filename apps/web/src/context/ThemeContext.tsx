import {
  useState,
  useEffect,
  useContext,
  createContext,
  type PropsWithChildren,
  type Dispatch,
  type SetStateAction,
} from 'react';

import { THEMES, type Theme } from '@/consts/themesConst';

import { useMatchMedia } from '@/hooks/useMatchMedia';

interface ThemeContextType {
  themeMode: Theme;
  setThemeMode: Dispatch<SetStateAction<Theme>>;
}
const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [themeMode, setThemeMode] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme) ?? THEMES.SYSTEM
  );
  const isSystemDark = useMatchMedia('(prefers-color-scheme: dark)');

  useEffect(() => {
    localStorage.setItem('theme', themeMode);

    if (themeMode === THEMES.SYSTEM) {
      document.documentElement.dataset.theme = isSystemDark ? THEMES.DARK : THEMES.LIGHT;
    } else {
      document.documentElement.dataset.theme = themeMode;
    }
  }, [themeMode, isSystemDark]);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) throw new Error('useTheme must be used within ThemeProvider');

  return context;
}
