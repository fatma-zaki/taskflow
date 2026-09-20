/**
 * TaskFlow design tokens — the single source of truth for the visual language.
 *
 * These values are consumed in two places and nowhere else:
 *  1. `tailwind.config.js` imports them, so every utility class (bg-surface,
 *     text-ink-muted, rounded-card, shadow-card…) is generated from this file.
 *  2. Components that need a raw value in JS (SVG strokes, canvas, inline
 *     transforms) import from here instead of hardcoding a hex value.
 *
 * Changing the product's look means editing this file — not the screens.
 */

/** Core palette. Yellow is reserved for primary action, selection and focus. */
export const colors = {
  /** Warm off-white application canvas. */
  app: '#FBF9F4',
  surface: {
    DEFAULT: '#FFFFFF',
    muted: '#F6F4EE',
    sunken: '#F2F0EA',
  },
  primary: {
    DEFAULT: '#FFC83D',
    strong: '#F0B417',
    soft: '#FFF4CC',
    tint: '#FFFAEA',
  },
  ink: {
    DEFAULT: '#172033',
    muted: '#6F7888',
    faint: '#9BA3B0',
    inverse: '#FFFFFF',
  },
  line: {
    DEFAULT: '#E9E7E1',
    strong: '#DBD7CD',
  },
  success: {
    DEFAULT: '#2E9E6B',
    soft: '#E6F4EC',
  },
  danger: {
    DEFAULT: '#E2574C',
    soft: '#FCEBE9',
  },
  info: {
    DEFAULT: '#4C8DF6',
    soft: '#E9F0FE',
  },
  warning: {
    DEFAULT: '#E0A32E',
    soft: '#FDF3E0',
  },
};

/** Border radii. `card` is the default surface radius across the app. */
export const radius = {
  sm: '10px',
  md: '14px',
  card: '18px',
  lg: '22px',
  xl: '28px',
};

/**
 * Type scale. Every screen uses a named step — no ad-hoc `text-[13px]`.
 * [fontSize, { lineHeight, letterSpacing, fontWeight }]
 */
export const fontSize = {
  display: ['26px', { lineHeight: '32px', letterSpacing: '-0.02em', fontWeight: '700' }],
  title: ['22px', { lineHeight: '28px', letterSpacing: '-0.015em', fontWeight: '700' }],
  section: ['17px', { lineHeight: '24px', letterSpacing: '-0.01em', fontWeight: '600' }],
  body: ['15px', { lineHeight: '22px' }],
  bodysm: ['14px', { lineHeight: '20px' }],
  sub: ['13px', { lineHeight: '18px' }],
  caption: ['12px', { lineHeight: '16px' }],
  micro: ['11px', { lineHeight: '14px', letterSpacing: '0.01em' }],
};

/** Restrained elevation — shadows only where a surface must lift off the page. */
export const boxShadow = {
  card: '0 1px 2px rgba(23, 32, 51, 0.04), 0 10px 24px -18px rgba(23, 32, 51, 0.24)',
  raised: '0 2px 6px rgba(23, 32, 51, 0.06), 0 16px 32px -20px rgba(23, 32, 51, 0.30)',
  nav: '0 -2px 16px -12px rgba(23, 32, 51, 0.35)',
  fab: '0 6px 18px -6px rgba(240, 180, 23, 0.65)',
  none: 'none',
};

/** Layout constants shared by the shell, screens and fixed elements. */
export const layout = {
  /** Reference viewport from the design: 390 × 844, capped at 430px. */
  maxWidth: '430px',
  screenPadding: '20px',
  bottomNavHeight: '68px',
  headerHeight: '56px',
};

export const spacing = {
  screen: layout.screenPadding,
  nav: layout.bottomNavHeight,
  header: layout.headerHeight,
};

/** Minimum comfortable tap target (Apple HIG / Material both land near 44px). */
export const touchTarget = '44px';

export const fontFamily = {
  sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
};

/** Motion: fast and restrained. Durations in ms. */
export const motion = {
  instant: 120,
  fast: 180,
  base: 240,
  slow: 320,
  easeOut: 'cubic-bezier(0.22, 1, 0.36, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
};

export const tokens = {
  colors,
  radius,
  fontSize,
  fontFamily,
  boxShadow,
  layout,
  spacing,
  touchTarget,
  motion,
};

export default tokens;
