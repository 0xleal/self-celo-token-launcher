/**
 * Design System Constants
 *
 * Centralized design tokens for the CELO Token Launcher application.
 * These values align with the CSS variables in globals.css.
 */

// CELO Brand Colors (hex for use in JavaScript)
export const COLORS = {
  celo: {
    green: '#35D07F',
    greenLight: '#5CDB96',
    greenDark: '#21B26B',
    gold: '#FBCC5C',
    goldLight: '#FFE180',
    goldDark: '#E8B84D',
    prosperity: '#46CD85',
  },
  semantic: {
    success: '#35D07F',
    warning: '#FBCC5C',
    error: '#EF4444',
    info: '#3B82F6',
  },
} as const;

// Gradients
export const GRADIENTS = {
  primary: 'linear-gradient(135deg, #35D07F 0%, #46CD85 100%)',
  energy: 'linear-gradient(135deg, #35D07F 0%, #FBCC5C 100%)',
  subtle: 'linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)',
} as const;

// Typography Scale
export const FONT_SIZES = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '2rem',    // 32px
  '4xl': '2.5rem',  // 40px
  '5xl': '3.5rem',  // 56px
} as const;

// Font Weights
export const FONT_WEIGHTS = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

// Spacing Scale (matches Tailwind)
export const SPACING = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  24: '6rem',     // 96px
} as const;

// Border Radius
export const RADIUS = {
  sm: '0.5rem',     // 8px
  md: '0.75rem',    // 12px
  lg: '1rem',       // 16px
  xl: '1.25rem',    // 20px
  full: '9999px',
} as const;

// Breakpoints
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Animation Durations (in ms)
export const DURATIONS = {
  fast: 150,
  normal: 200,
  slow: 300,
  slower: 400,
} as const;

// z-index scale
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

// Helper functions
export const pxToRem = (px: number): string => `${px / 16}rem`;

export const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
};

export const hexToRgba = (hex: string, alpha: number): string => {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
