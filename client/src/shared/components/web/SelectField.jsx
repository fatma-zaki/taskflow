import { ChevronDown } from 'lucide-react';
import { cn } from '@/shared/utils/cn.js';

/**
 * @typedef {Object} SelectOption
 * @property {string} value
 * @property {string} label
 */

/**
 * Labelled select for web forms and filter bars. Phones use `OptionPicker`
 * instead, which is why this lives under `web/`.
 *
 * @param {Object} props
 * @param {string} props.name
 * @param {string} props.value
 * @param {(value: string) => void} props.onChange
 * @param {SelectOption[]} props.options
 * @param {string} [props.label]
 * @param {string} [props.placeholder] Rendered as an empty-value first option.
 * @param {string | null} [props.error]
 * @param {string} [props.className]
 */
export default function SelectField({
  name,
  value,
  onChange,
  options,
  label,
  placeholder,
  error,
  className,
}) {
  return (
    <div className={className}>
      {label ? (
        <label htmlFor={name} className="mb-1.5 block text-sub font-semibold text-ink">
          {label}
        </label>
      ) : null}

      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          className={cn(
            'h-11 w-full appearance-none rounded-md border bg-surface pl-3.5 pr-9 text-bodysm text-ink',
            'transition-colors duration-fast focus:border-primary focus:outline-none',
            error ? 'border-danger' : 'border-line',
          )}
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint"
        />
      </div>

      {error ? <p className="mt-1.5 text-caption text-danger">{error}</p> : null}
    </div>
  );
}
