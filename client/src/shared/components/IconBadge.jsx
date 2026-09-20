import { cloneElement, isValidElement } from 'react';
import { cn } from '@/shared/utils/cn.js';
import { toneForeground, toneSurface } from '@/shared/theme/tones.js';

/** @type {Record<'sm' | 'md' | 'lg', { box: string, icon: number }>} */
const SIZES = {
  sm: { box: 'w-8 h-8 rounded-sm', icon: 16 },
  md: { box: 'w-10 h-10 rounded-md', icon: 18 },
  lg: { box: 'w-11 h-11 rounded-md', icon: 20 },
};

/**
 * A soft, tinted container for a single icon. Used by stats, category rows,
 * settings rows and the activity feed so icon treatment never diverges.
 *
 * @param {Object} props
 * @param {import('react').ReactElement} props.icon A lucide icon element.
 * @param {import('@/shared/theme/tones.js').Tone} [props.tone]
 * @param {'sm' | 'md' | 'lg'} [props.size]
 * @param {string} [props.className]
 */
export default function IconBadge({ icon, tone = 'neutral', size = 'md', className }) {
  const { box, icon: iconSize } = SIZES[size];

  return (
    <span
      aria-hidden="true"
      className={cn('inline-flex shrink-0 items-center justify-center', box, toneSurface[tone], toneForeground[tone], className)}
    >
      {isValidElement(icon) ? cloneElement(icon, { size: iconSize, strokeWidth: 2 }) : icon}
    </span>
  );
}
