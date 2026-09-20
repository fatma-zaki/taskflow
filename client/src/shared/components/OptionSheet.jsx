import { Check } from 'lucide-react';
import { cn } from '@/shared/utils/cn.js';
import BottomSheet from './BottomSheet.jsx';

/**
 * @template {string} T
 * @typedef {Object} SheetOption
 * @property {T} value
 * @property {string} label
 * @property {string} [description]
 * @property {import('react').ReactNode} [leading]
 */

/**
 * Single-select list inside a bottom sheet — the mobile replacement for a
 * `<select>`. Used for priority, assignee and any future enum field.
 *
 * @template {string} T
 * @param {Object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {string} props.title
 * @param {SheetOption<T>[]} props.options
 * @param {T | undefined} props.value
 * @param {(value: T) => void} props.onSelect
 */
export default function OptionSheet({ open, onClose, title, options, value, onSelect }) {
  return (
    <BottomSheet open={open} onClose={onClose} title={title}>
      <ul className="px-2 pt-2">
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => {
                  onSelect(option.value);
                  onClose();
                }}
                className={cn(
                  'press-sm flex min-h-touch w-full items-center gap-3 rounded-md px-3 py-3 text-left',
                  'transition-colors duration-fast active:bg-surface-muted',
                  selected && 'bg-primary-tint',
                )}
              >
                {option.leading}
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-body font-medium text-ink">{option.label}</span>
                  {option.description ? (
                    <span className="mt-0.5 block truncate text-sub text-ink-muted">{option.description}</span>
                  ) : null}
                </span>
                {selected ? <Check size={18} className="shrink-0 text-primary-strong" /> : null}
              </button>
            </li>
          );
        })}
      </ul>
    </BottomSheet>
  );
}
