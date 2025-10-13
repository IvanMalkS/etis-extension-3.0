import { useState, useEffect } from 'preact/hooks';

export type Theme = 'light' | 'dark' | 'auto';

let prefersColorSchemeMedia: MediaQueryList | undefined;

function handleSystemThemeChange(e: MediaQueryListEvent) {
  document.documentElement.setAttribute('theme', e.matches ? 'dark' : 'light');
}


function setSystemThemeDetection() {
  if (window.matchMedia) {
    if (!prefersColorSchemeMedia) {
        prefersColorSchemeMedia = window.matchMedia('(prefers-color-scheme: dark)');
    }
    document.documentElement.setAttribute('theme', prefersColorSchemeMedia.matches ? 'dark' : 'light');
    prefersColorSchemeMedia.addEventListener('change', handleSystemThemeChange);
  }
}

function removeSystemThemeDetection() {
  if (prefersColorSchemeMedia) {
    prefersColorSchemeMedia.removeEventListener('change', handleSystemThemeChange);
  }
}


export function initializeTheme(): void {
  const storedTheme = localStorage.getItem('theme') as Theme | null;
  const currentTheme: Theme = storedTheme || 'auto';

  if (currentTheme === 'auto') {
    setSystemThemeDetection();
  } else {
    document.documentElement.setAttribute('theme', currentTheme);
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'auto';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    if (theme === 'auto') {
      setSystemThemeDetection();
    } else {
      removeSystemThemeDetection();
      document.documentElement.setAttribute('theme', theme);
    }
  }, [theme]);

  const cycleTheme = () => {
    setTheme(currentTheme => {
      if (currentTheme === 'auto') return 'light';
      if (currentTheme === 'light') return 'dark';
      return 'auto';
    });
  };

  return { theme, cycleTheme };
}