import { ChevronRight } from 'lucide-react';
import { cn } from '@/shared/utils/cn.js';
import { formatFullDate, formatTime, toDateTimeInputValue } from '@/shared/utils/date.js';

/**
 * A form row that opens the platform's own date/time picker: the native input
 * is laid transparently over the row, so the control feels like the OS while
 * the row keeps the app's styling.
 *
 * @param {Object} props
 * @param {string} props.label
 * @param {string} props.value ISO timestamp, or an empty string.
 * @param {(isoValue: string) => void} props.onChange Receives an ISO timestamp.
 * @param {string} [props.placeholder]
 * @param {import('react').ReactNode} [props.icon]
 * @param {string | null} [props.error]
 * @param {string} [props.min] ISO timestamp the value may not precede.
 * @param {string} [props.className]
 */
export default function DateTimeRow({
  label,
  value,
  onChange,
  placeholder = 'Select date',
  icon,
  error,
  min,
  className,
}) {
  const display = value ? `${formatFullDate(value)} · ${formatTime(value)}` : '';

  return (
    <div className={className}>
      <div className="relative flex min-h-touch items-center gap-3 px-4 py-3">
        {icon ? <span className="shrink-0 text-ink-faint">{icon}</span> : null}
        <span className="min-w-0 flex-1">
          <span className="block text-bodysm font-semibold text-ink">{label}</span>
          <span className={cn('mt-0.5 block truncate text-sub', display ? 'text-ink-muted' : 'text-ink-faint')}>
            {display || placeholder}
          </span>
        </span>
        <ChevronRight size={18} className="shrink-0 text-ink-faint" />

        <input
          type="datetime-local"
          aria-label={label}
          value={toDateTimeInputValue(value)}
          min={min ? toDateTimeInputValue(min) : undefined}
          onChange={(event) => {
            const next = event.target.value;
            onChange(next ? new Date(next).toISOString() : '');
          }}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </div>
      {error ? <p className="px-4 pb-2 text-caption text-danger">{error}</p> : null}
    </div>
  );
}
