import { colors } from '@/shared/theme/tokens.js';

/**
 * Small growth motif closing the Categories screen — decorative only.
 *
 * @param {Object} props
 * @param {number} [props.size]
 */
export default function SproutIllustration({ size = 96 }) {
  return (
    <svg width={size} height={size * 0.75} viewBox="0 0 96 72" fill="none" role="presentation" aria-hidden="true">
      <ellipse cx="48" cy="63" rx="30" ry="5" fill={colors.primary.soft} />
      <path
        d="M48 62c0-14 2-24 8-31"
        stroke={colors.ink.faint}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M47 42c-9-3-15-10-16-20 11 1 17 7 18 18 0 1-1 2-2 2Z"
        fill={colors.ink.DEFAULT}
        opacity="0.85"
      />
      <path
        d="M53 38c2-11 9-18 21-20-1 12-8 19-19 21-1 0-2-1-2-1Z"
        fill={colors.primary.DEFAULT}
      />
      <circle cx="78" cy="14" r="3" fill={colors.primary.soft} />
      <circle cx="20" cy="20" r="2" fill={colors.primary.soft} />
    </svg>
  );
}
