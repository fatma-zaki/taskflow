import { cn } from '@/shared/utils/cn.js';

/**
 * Labelled, bordered textarea for web forms.
 *
 * @param {Object} props
 * @param {string} props.name
 * @param {string} props.value
 * @param {(value: string) => void} props.onChange
 * @param {string} [props.label]
 * @param {string} [props.placeholder]
 * @param {number} [props.rows]
 * @param {string} [props.className]
 */
export default function TextAreaInput({
  name,
  value,
  onChange,
  label,
  placeholder,
  rows = 5,
  className,
}) {
  return (
    <div className={className}>
      {label ? (
        <label htmlFor={name} className="mb-1.5 block text-sub font-semibold text-ink">
          {label}
        </label>
      ) : null}
      <textarea
        id={name}
        name={name}
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={label ?? placeholder}
        className={cn(
          'w-full resize-y rounded-md border border-line bg-surface px-3.5 py-3 text-bodysm text-ink',
          'placeholder:text-ink-faint transition-colors duration-fast focus:border-primary focus:outline-none',
        )}
      />
    </div>
  );
}
