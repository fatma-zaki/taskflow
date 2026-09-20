import { cn } from '@/shared/utils/cn.js';

/**
 * @template {string} T
 * @typedef {Object} ChipOption
 * @property {T} value
 * @property {string} label
 */

/**
 * A horizontally scrollable, single-select chip row.
 *
 * @template {string} T
 * @param {Object} props
 * @param {ChipOption<T>[]} props.options
 * @param {T} props.value
 * @param {(value: T) => void} props.onChange
 * @param {string} [props.label] Accessible group name.
 * @param {string} [props.className]
 */
export default function FilterChips({ options, value, onChange, label = 'Filter', className }) {
  return (
    <div
      role="tablist"
      aria-label={label}
      data-scroll-area
      className={cn('scrollbar-none -mx-screen flex gap-2 overflow-x-auto px-screen', className)}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              'press shrink-0 rounded-full px-4 py-2 text-sub font-semibold',
              'transition-colors duration-fast',
              selected
                ? 'bg-primary text-ink shadow-card'
                : 'border border-line bg-surface text-ink-muted active:bg-surface-muted',
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
