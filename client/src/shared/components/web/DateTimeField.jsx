import { cn } from '@/shared/utils/cn.js';
import { toDateTimeInputValue } from '@/shared/utils/date.js';

/**
 * Labelled date-and-time input for web forms. Values are ISO strings in and
 * out, matching the task API.
 *
 * @param {Object} props
 * @param {string} props.name
 * @param {string} props.value ISO timestamp, or an empty string.
 * @param {(isoValue: string) => void} props.onChange
 * @param {string} [props.label]
 * @param {string | null} [props.error]
 * @param {string} [props.min] ISO timestamp the value may not precede.
 * @param {string} [props.className]
 */
export default function DateTimeField({ name, value, onChange, label, error, min, className }) {
  return (
    <div className={className}>
      {label ? (
        <label htmlFor={name} className="mb-1.5 block text-sub font-semibold text-ink">
          {label}
        </label>
      ) : null}
      <input
        id={name}
        name={name}
        type="datetime-local"
        value={toDateTimeInputValue(value)}
        min={min ? toDateTimeInputValue(min) : undefined}
        onChange={(event) => {
          const next = event.target.value;
          onChange(next ? new Date(next).toISOString() : '');
        }}
        aria-invalid={Boolean(error)}
        className={cn(
          'h-11 w-full rounded-md border bg-surface px-3.5 text-bodysm text-ink',
          'transition-colors duration-fast focus:border-primary focus:outline-none',
          error ? 'border-danger' : 'border-line',
        )}
      />
      {error ? <p className="mt-1.5 text-caption text-danger">{error}</p> : null}
    </div>
  );
}
