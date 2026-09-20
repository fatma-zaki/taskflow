import { cn } from '@/shared/utils/cn.js';

/** @type {Record<'sm' | 'md' | 'lg', string>} */
const SIZES = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-9 h-9 border-[3px]',
};

/**
 * @param {Object} props
 * @param {'sm' | 'md' | 'lg'} [props.size]
 * @param {string} [props.className]
 */
export default function Spinner({ size = 'md', className }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        'inline-block rounded-full border-primary-soft border-t-primary animate-spin',
        SIZES[size],
        className,
      )}
    />
  );
}
