import { cn } from '@/shared/utils/cn.js';

/**
 * Loading placeholder. Prefer this over a spinner for lists, so the layout
 * does not jump once data lands.
 *
 * @param {Object} props
 * @param {string} [props.className]
 */
export default function Skeleton({ className }) {
  return <div aria-hidden="true" className={cn('animate-pulse rounded-sm bg-surface-sunken', className)} />;
}
