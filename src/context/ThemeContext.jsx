import { useState, useEffect, useContext, createContext } from 'react';

import { useMatchMedia } from '@/hooks/useMatchMedia';

const ThemeContext = createContext(null);

export function ThemeProvider(props) {
  const [themeMode, setThemeMode] = useState(
    () => localStorage.getItem('theme') ?? 'system'
  );
  const isSystemDark = useMatchMedia('(prefers-color-scheme: dark)');

  useEffect(() => {
    localStorage.setItem('theme', themeMode);

    if (themeMode === 'system') {
      document.documentElement.dataset.theme = isSystemDark ? 'dark' : 'light';
    } else {
      document.documentElement.dataset.theme = themeMode;
    }
  }, [themeMode, isSystemDark]);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }} {...props} />
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) throw new Error('useTheme must be used within ThemeProvider');

  return context;
}
