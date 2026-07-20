export const theme = {
  colors: {
    background: '#140726',
    backgroundAlt: '#1D1038',
    surface: '#1E1038',
    surfaceLight: '#2A1550',
    primary: '#2B0A5A',
    primaryLight: '#46117B',
    accent: '#FFD54A',
    accentSoft: '#FFE7A3',
    white: '#FFFFFF',
    text: '#F5F5F5',
    textMuted: '#B7B7C9',
    textDark: '#1F1630',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
    border: 'rgba(255,255,255,0.14)',
  },
  typography: {
    display: 'text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight',
    pageHeading: 'text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight',
    sectionHeading: 'text-2xl sm:text-3xl font-semibold tracking-tight',
    body: 'text-base leading-7 text-white/75',
    small: 'text-sm leading-6 text-white/70',
    caption: 'text-xs uppercase tracking-[0.28em] font-semibold',
  },
  spacing: {
    section: 'py-20 sm:py-24 lg:py-32',
    container: 'px-4 sm:px-6 lg:px-8',
  },
  radius: {
    sm: '10px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    full: '9999px',
  },
  shadows: {
    soft: '0 16px 45px rgba(0,0,0,0.16)',
    medium: '0 24px 70px rgba(0,0,0,0.22)',
    strong: '0 36px 100px rgba(0,0,0,0.28)',
    glow: '0 0 0 1px rgba(255,213,74,0.15), 0 18px 45px rgba(255,213,74,0.16)',
    glass: '0 20px 60px rgba(0,0,0,0.25)',
  },
  transitions: {
    fast: 'transition-all duration-200 ease-out',
    base: 'transition-all duration-300 ease-out',
    slow: 'transition-all duration-500 ease-out',
  },
  animation: {
    duration: {
      fast: 200,
      base: 300,
      slow: 500,
    },
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};

export const colors = theme.colors;
export const typography = theme.typography;
export const spacing = theme.spacing;
export const radius = theme.radius;
export const shadows = theme.shadows;
export const transitions = theme.transitions;
export const animation = theme.animation;
export const breakpoints = theme.breakpoints;