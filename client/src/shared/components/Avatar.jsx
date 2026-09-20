import { cn } from '@/shared/utils/cn.js';
import { initialsOf } from '@/shared/utils/entity.js';

/** @type {Record<'sm' | 'md' | 'lg', string>} */
const SIZES = {
  sm: 'w-8 h-8 text-caption',
  md: 'w-11 h-11 text-body',
  lg: 'w-14 h-14 text-section',
};

/**
 * Initials avatar. The app has no avatar upload endpoint yet, so this is the
 * single place a real image would later be swapped in.
 *
 * @param {Object} props
 * @param {string} [props.name]
 * @param {'sm' | 'md' | 'lg'} [props.size]
 * @param {string} [props.className]
 */
export default function Avatar({ name, size = 'md', className }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full bg-primary font-bold text-ink',
        SIZES[size],
        className,
      )}
    >
      {initialsOf(name)}
    </span>
  );
}
