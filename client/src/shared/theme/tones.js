/**
 * Semantic "tones" map a meaning (success, danger, info…) to the class names
 * that render it. Components accept a tone; they never accept a color.
 *
 * @typedef {'primary' | 'success' | 'danger' | 'info' | 'warning' | 'neutral'} Tone
 */

/** @type {Record<Tone, string>} Soft badge / icon-chip background. */
export const toneSurface = {
  primary: 'bg-primary-soft',
  success: 'bg-success-soft',
  danger: 'bg-danger-soft',
  info: 'bg-info-soft',
  warning: 'bg-warning-soft',
  neutral: 'bg-surface-sunken',
};

/** @type {Record<Tone, string>} Foreground (icon / text) on a soft surface. */
export const toneForeground = {
  primary: 'text-primary-strong',
  success: 'text-success',
  danger: 'text-danger',
  info: 'text-info',
  warning: 'text-warning',
  neutral: 'text-ink-muted',
};

/** @type {Record<Tone, string>} Solid fill, for dots and progress. */
export const toneFill = {
  primary: 'bg-primary',
  success: 'bg-success',
  danger: 'bg-danger',
  info: 'bg-info',
  warning: 'bg-warning',
  neutral: 'bg-ink-faint',
};

/** @type {Record<Tone, string>} Border color for outlined treatments. */
export const toneBorder = {
  primary: 'border-primary',
  success: 'border-success',
  danger: 'border-danger',
  info: 'border-info',
  warning: 'border-warning',
  neutral: 'border-line',
};

/** @type {Tone} */
export const DEFAULT_TONE = 'neutral';
