import { Search, X } from 'lucide-react';
import { cn } from '@/shared/utils/cn.js';

/**
 * @param {Object} props
 * @param {string} props.value
 * @param {(value: string) => void} props.onChange
 * @param {string} [props.placeholder]
 * @param {string} [props.className]
 */
export default function SearchInput({ value, onChange, placeholder = 'Search…', className }) {
  return (
    <div className={cn('relative', className)}>
      <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
      <input
        type="search"
        inputMode="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className={cn(
          'h-11 w-full rounded-card border border-line bg-surface pl-11 pr-10 text-bodysm text-ink',
          'placeholder:text-ink-faint focus:border-primary focus:outline-none',
          'transition-colors duration-fast [&::-webkit-search-cancel-button]:hidden',
        )}
      />
      {value ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange('')}
          className="press absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-ink-faint active:bg-surface-muted"
        >
          <X size={16} />
        </button>
      ) : null}
    </div>
  );
}
