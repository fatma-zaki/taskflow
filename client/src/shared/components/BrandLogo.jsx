import { SquareCheckBig } from 'lucide-react';
import { cn } from '@/shared/utils/cn.js';

/** @type {Record<'sm' | 'md' | 'lg' | 'xl', { box: string, icon: number, text: string }>} */
const SIZES = {
  sm: { box: 'w-8 h-8 rounded-sm', icon: 17, text: 'text-section' },
  md: { box: 'w-9 h-9 rounded-md', icon: 19, text: 'text-section' },
  lg: { box: 'w-14 h-14 rounded-lg', icon: 28, text: 'text-display' },
  xl: { box: 'w-14 h-14 rounded-lg', icon: 28, text: 'text-hero' },
};

/**
 * TaskFlow wordmark.
 *
 * @param {Object} props
 * @param {'sm' | 'md' | 'lg' | 'xl'} [props.size]
 * @param {boolean} [props.withWordmark]
 * @param {string} [props.className]
 */
export default function BrandLogo({ size = 'md', withWordmark = true, className }) {
  const style = SIZES[size];

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        aria-hidden="true"
        className={cn('flex items-center justify-center bg-primary text-ink', style.box)}
      >
        <SquareCheckBig size={style.icon} strokeWidth={2.5} />
      </span>
      {withWordmark ? (
        <span className={cn('font-extrabold tracking-tight text-ink', style.text)}>TaskFlow</span>
      ) : null}
    </span>
  );
}
