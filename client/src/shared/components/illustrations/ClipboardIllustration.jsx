import { colors } from '@/shared/theme/tokens.js';

/**
 * Minimal clipboard used by the "no tasks" empty state.
 *
 * @param {Object} props
 * @param {number} [props.size]
 */
export default function ClipboardIllustration({ size = 84 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 84 84" fill="none" role="img" aria-label="An empty task list">
      <rect x="18" y="12" width="48" height="60" rx="10" fill={colors.surface.muted} />
      <rect x="18" y="12" width="48" height="60" rx="10" stroke={colors.line.DEFAULT} strokeWidth="2" />
      <rect x="32" y="6" width="20" height="12" rx="5" fill={colors.primary.DEFAULT} />
      <path d="M29 34h26" stroke={colors.line.strong} strokeWidth="3" strokeLinecap="round" />
      <path d="M29 45h18" stroke={colors.line.strong} strokeWidth="3" strokeLinecap="round" />
      <path d="M29 56h13" stroke={colors.line.strong} strokeWidth="3" strokeLinecap="round" />
      <path
        d="M62 52.5 68.5 59 79 47"
        stroke={colors.primary.strong}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
