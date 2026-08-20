import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ThemeOption {
  id: string;
  name: string;
  tagline: string;
  previewColors: string[];
  gradient: string;
  primaryClass: string;
  textAccent: string;
  borderAccent: string;
  bgAccent: string;
  activePillBg: string;
  activePillText: string;
  buttonGradient: string;
  ringFocus: string;
}

export const PASTEL_THEMES: ThemeOption[] = [
  {
    id: 'pastel-lavender',
    name: 'Pastel Lavender',
    tagline: 'Soft lilac & dreamy cloud vibes (Default)',
    previewColors: ['#DDD6FE', '#C4B5FD', '#A78BFA'], // Soft lavender hues
    gradient: 'from-purple-300 via-indigo-200 to-pink-200',
    primaryClass: 'purple',
    textAccent: 'text-purple-600 dark:text-purple-300',
    borderAccent: 'border-purple-300/60 dark:border-purple-500/30',
    bgAccent: 'bg-purple-100/70 dark:bg-purple-950/40',
    activePillBg: 'bg-purple-400 dark:bg-purple-500',
    activePillText: 'text-purple-700 dark:text-purple-300',
    buttonGradient: 'from-purple-400 via-indigo-300 to-purple-400 hover:from-purple-500 hover:to-indigo-400 text-purple-950 shadow-purple-200/50 dark:shadow-purple-900/30',
    ringFocus: 'focus:ring-purple-300',
  },
  {
    id: 'pastel-mint',
    name: 'Pastel Mint',
    tagline: 'Refreshing sage greens & spring quad breeze',
    previewColors: ['#A7F3D0', '#6EE7B7', '#5EEAD4'], // Soft mint/sage
    gradient: 'from-emerald-200 via-teal-200 to-cyan-100',
    primaryClass: 'emerald',
    textAccent: 'text-emerald-700 dark:text-emerald-300',
    borderAccent: 'border-emerald-300/60 dark:border-emerald-500/30',
    bgAccent: 'bg-emerald-100/70 dark:bg-emerald-950/40',
    activePillBg: 'bg-emerald-400 dark:bg-emerald-500',
    activePillText: 'text-emerald-700 dark:text-emerald-300',
    buttonGradient: 'from-emerald-300 via-teal-200 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-emerald-950 shadow-emerald-200/50 dark:shadow-emerald-900/30',
    ringFocus: 'focus:ring-emerald-300',
  },
  {
    id: 'pastel-peach',
    name: 'Pastel Peach',
    tagline: 'Warm apricot, cozy cafe morning & campus sunrise',
    previewColors: ['#FED7AA', '#FDBA74', '#FECDD3'], // Soft peach & apricot
    gradient: 'from-orange-200 via-amber-200 to-rose-200',
    primaryClass: 'orange',
    textAccent: 'text-orange-600 dark:text-orange-300',
    borderAccent: 'border-orange-300/60 dark:border-orange-500/30',
    bgAccent: 'bg-orange-100/70 dark:bg-orange-950/40',
    activePillBg: 'bg-orange-400 dark:bg-orange-500',
    activePillText: 'text-orange-700 dark:text-orange-300',
    buttonGradient: 'from-orange-300 via-amber-200 to-rose-300 hover:from-orange-400 hover:to-rose-400 text-orange-950 shadow-orange-200/50 dark:shadow-orange-900/30',
    ringFocus: 'focus:ring-orange-300',
  },
  {
    id: 'pastel-sky',
    name: 'Pastel Sky',
    tagline: 'Calm baby blue, study focus & serene campus afternoon',
    previewColors: ['#BAE6FD', '#7DD3FC', '#A5F3FC'], // Soft baby blue
    gradient: 'from-sky-200 via-cyan-100 to-blue-200',
    primaryClass: 'sky',
    textAccent: 'text-sky-700 dark:text-sky-300',
    borderAccent: 'border-sky-300/60 dark:border-sky-500/30',
    bgAccent: 'bg-sky-100/70 dark:bg-sky-950/40',
    activePillBg: 'bg-sky-400 dark:bg-sky-500',
    activePillText: 'text-sky-700 dark:text-sky-300',
    buttonGradient: 'from-sky-300 via-cyan-200 to-blue-300 hover:from-sky-400 hover:to-blue-400 text-sky-950 shadow-sky-200/50 dark:shadow-sky-900/30',
    ringFocus: 'focus:ring-sky-300',
  },
  {
    id: 'pastel-rose',
    name: 'Pastel Blossom',
    tagline: 'Cherry blossom petals, soft pinks & gentle warmth',
    previewColors: ['#FBCFE8', '#F472B6', '#FDA4AF'], // Soft pink / rose
    gradient: 'from-pink-200 via-rose-100 to-fuchsia-200',
    primaryClass: 'pink',
    textAccent: 'text-pink-600 dark:text-pink-300',
    borderAccent: 'border-pink-300/60 dark:border-pink-500/30',
    bgAccent: 'bg-pink-100/70 dark:bg-pink-950/40',
    activePillBg: 'bg-pink-400 dark:bg-pink-500',
    activePillText: 'text-pink-700 dark:text-pink-300',
    buttonGradient: 'from-pink-300 via-rose-200 to-fuchsia-300 hover:from-pink-400 hover:to-fuchsia-400 text-pink-950 shadow-pink-200/50 dark:shadow-pink-900/30',
    ringFocus: 'focus:ring-pink-300',
  },
  {
    id: 'pastel-butter',
    name: 'Pastel Buttercup',
    tagline: 'Warm creamy vanilla & radiant campus sunshine',
    previewColors: ['#FEF08A', '#FDE047', '#FED7AA'], // Soft buttercup yellow
    gradient: 'from-yellow-200 via-amber-100 to-orange-100',
    primaryClass: 'yellow',
    textAccent: 'text-amber-700 dark:text-yellow-300',
    borderAccent: 'border-yellow-300/60 dark:border-yellow-500/30',
    bgAccent: 'bg-yellow-100/70 dark:bg-yellow-950/40',
    activePillBg: 'bg-amber-300 dark:bg-yellow-500',
    activePillText: 'text-amber-800 dark:text-yellow-300',
    buttonGradient: 'from-yellow-300 via-amber-200 to-orange-200 hover:from-yellow-400 hover:to-amber-300 text-amber-950 shadow-yellow-200/50 dark:shadow-yellow-900/30',
    ringFocus: 'focus:ring-yellow-300',
  },
];

export const THEMES: ThemeOption[] = PASTEL_THEMES;

interface ThemeContextType {
  currentTheme: ThemeOption;
  themeId: string;
  setTheme: (themeId: string) => void;
  cycleNextTheme: () => void;
  themes: ThemeOption[];
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: PASTEL_THEMES[0],
  themeId: 'pastel-lavender',
  setTheme: () => {},
  cycleNextTheme: () => {},
  themes: PASTEL_THEMES,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeId, setThemeId] = useState<string>(() => {
    const saved = localStorage.getItem('campus_buzz_theme');
    // Ensure default matches a pastel theme
    if (!saved || !PASTEL_THEMES.some((t) => t.id === saved)) {
      return 'pastel-lavender';
    }
    return saved;
  });

  const currentTheme = PASTEL_THEMES.find((t) => t.id === themeId) || PASTEL_THEMES[0];

  const setTheme = (newThemeId: string) => {
    setThemeId(newThemeId);
    localStorage.setItem('campus_buzz_theme', newThemeId);
  };

  const cycleNextTheme = () => {
    const currentIndex = PASTEL_THEMES.findIndex((t) => t.id === themeId);
    const nextIndex = (currentIndex + 1) % PASTEL_THEMES.length;
    const nextTheme = PASTEL_THEMES[nextIndex];
    setTheme(nextTheme.id);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme.id);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, themeId, setTheme, cycleNextTheme, themes: PASTEL_THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
