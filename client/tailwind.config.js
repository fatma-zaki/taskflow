import {
  colors,
  radius,
  fontSize,
  fontFamily,
  boxShadow,
  layout,
  spacing,
  touchTarget,
  motion,
} from './src/shared/theme/tokens.js';

/**
 * Tailwind is generated from the design tokens — never edit values here.
 * @see src/shared/theme/tokens.js
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        app: colors.app,
        surface: colors.surface,
        primary: colors.primary,
        ink: colors.ink,
        line: colors.line,
        success: colors.success,
        danger: colors.danger,
        info: colors.info,
        warning: colors.warning,
      },
      borderColor: {
        DEFAULT: colors.line.DEFAULT,
      },
      borderRadius: radius,
      fontFamily,
      fontSize,
      boxShadow,
      maxWidth: {
        app: layout.maxWidth,
      },
      spacing: {
        screen: spacing.screen,
        nav: spacing.nav,
        header: spacing.header,
        touch: touchTarget,
      },
      minHeight: {
        touch: touchTarget,
      },
      minWidth: {
        touch: touchTarget,
      },
      transitionTimingFunction: {
        out: motion.easeOut,
        spring: motion.spring,
      },
      transitionDuration: {
        instant: `${motion.instant}ms`,
        fast: `${motion.fast}ms`,
        base: `${motion.base}ms`,
        slow: `${motion.slow}ms`,
      },
      keyframes: {
        'screen-in': {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'sheet-in': {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'none' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'check-pop': {
          '0%': { transform: 'scale(0.6)', opacity: '0.4' },
          '60%': { transform: 'scale(1.15)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'row-complete': {
          '0%': { backgroundColor: colors.primary.tint },
          '100%': { backgroundColor: 'transparent' },
        },
      },
      animation: {
        'screen-in': `screen-in ${motion.base}ms ${motion.easeOut} both`,
        'sheet-in': `sheet-in ${motion.base}ms ${motion.easeOut} both`,
        'fade-in': `fade-in ${motion.fast}ms ${motion.easeOut} both`,
        'check-pop': `check-pop ${motion.base}ms ${motion.spring} both`,
        'row-complete': `row-complete 600ms ${motion.easeOut} both`,
      },
    },
  },
  plugins: [],
};
