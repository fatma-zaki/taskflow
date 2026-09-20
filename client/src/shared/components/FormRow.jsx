import { ChevronRight } from 'lucide-react';
import { cn } from '@/shared/utils/cn.js';

/**
 * A large, touch-friendly form row: leading icon, label, current value and a
 * chevron. Tapping it opens a picker rather than revealing a desktop input.
 *
 * @param {Object} props
 * @param {string} props.label
 * @param {import('react').ReactNode} [props.value] Current selection.
 * @param {import('react').ReactNode} [props.icon]
 * @param {() => void} [props.onClick]
 * @param {string | null} [props.error]
 * @param {boolean} [props.chevron]
 * @param {string} [props.className]
 */
export default function FormRow({ label, value, icon, onClick, error, chevron = true, className }) {
  const Element = onClick ? 'button' : 'div';

  return (
    <div className={className}>
      <Element
        {...(onClick ? { type: /** @type {const} */ ('button'), onClick } : {})}
        className={cn(
          'flex w-full min-h-touch items-center gap-3 px-4 py-3 text-left',
          onClick && 'press-sm transition-colors duration-fast active:bg-surface-muted',
        )}
      >
        {icon ? <span className="shrink-0 text-ink-faint">{icon}</span> : null}
        <span className="min-w-0 flex-1">
          <span className="block text-bodysm font-semibold text-ink">{label}</span>
          <span className={cn('mt-0.5 block truncate text-sub', value ? 'text-ink-muted' : 'text-ink-faint')}>
            {value || 'Not set'}
          </span>
        </span>
        {chevron && onClick ? <ChevronRight size={18} className="shrink-0 text-ink-faint" /> : null}
      </Element>
      {error ? <p className="px-4 pb-2 text-caption text-danger">{error}</p> : null}
    </div>
  );
}
