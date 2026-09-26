'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    try {
      const savedTheme = localStorage.getItem('rosa_theme') as Theme | null;
      if (savedTheme === 'dark' || savedTheme === 'light') {
        setThemeState(savedTheme);
        if (savedTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    } catch (_) {}
  }, []);

  const setTheme = (newTheme: Theme): void => {
    // Disable CSS transitions temporarily to prevent lag/stutter during theme swap
    const css = document.createElement('style');
    css.type = 'text/css';
    css.appendChild(document.createTextNode('* { -webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; -ms-transition: none !important; transition: none !important; }'));
    document.head.appendChild(css);

    setThemeState(newTheme);
    localStorage.setItem('rosa_theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Force a browser reflow before re-enabling transitions
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = window.getComputedStyle(document.body).opacity;
    
    setTimeout(() => {
      document.head.removeChild(css);
    }, 10);
  };

  const toggleTheme = (): void => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme: mounted ? theme : 'light', toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
