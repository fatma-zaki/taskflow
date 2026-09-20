import { colors, boxShadow, radius } from '@/shared/theme/tokens.js';

/**
 * Toasts styled from the design tokens and placed at the top, clear of the
 * thumb zone and the bottom navigation.
 *
 * @type {import('react-hot-toast').ToasterProps}
 */
export const toastOptions = {
  position: 'top-center',
  toastOptions: {
    duration: 2600,
    style: {
      background: colors.surface.DEFAULT,
      color: colors.ink.DEFAULT,
      border: `1px solid ${colors.line.DEFAULT}`,
      borderRadius: radius.card,
      boxShadow: boxShadow.card,
      fontSize: '14px',
      fontWeight: 500,
      maxWidth: '20rem',
    },
    success: { iconTheme: { primary: colors.success.DEFAULT, secondary: colors.surface.DEFAULT } },
    error: { iconTheme: { primary: colors.danger.DEFAULT, secondary: colors.surface.DEFAULT } },
  },
};

export default toastOptions;
