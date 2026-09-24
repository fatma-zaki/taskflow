import { cn } from '@/shared/utils/cn.js';

/**
 * Labelled, bordered text input for web forms and filter bars. (The phone
 * screens use `TextField`, which is borderless inside a row group.)
 *
 * @param {Object} props
 * @param {string} props.name
 * @param {string} props.value
 * @param {(value: string) => void} props.onChange
 * @param {string} [props.label]
 * @param {string} [props.placeholder]
 * @param {'text' | 'email' | 'password' | 'search' | 'number'} [props.type]
 * @param {string | null} [props.error]
 * @param {() => void} [props.onBlur]
 * @param {import('react').ReactNode} [props.leading]
 * @param {import('react').ReactNode} [props.trailing]
 * @param {string} [props.className]
 */
export default function InputField({
  name,
  value,
  onChange,
  label,
  placeholder,
  type = 'text',
  error,
  onBlur,
  leading,
  trailing,
  className,
}) {
  return (
    <div className={className}>
      {label ? (
        <label htmlFor={name} className="mb-1.5 block text-sub font-semibold text-ink">
          {label}
        </label>
      ) : null}

      <div
        className={cn(
          'flex h-11 items-center gap-2.5 rounded-md border bg-surface px-3.5',
          'transition-colors duration-fast focus-within:border-primary',
          error ? 'border-danger' : 'border-line',
        )}
      >
        {leading}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-label={label ?? placeholder}
          aria-invalid={Boolean(error)}
          className="w-full bg-transparent text-bodysm text-ink placeholder:text-ink-faint focus:outline-none"
        />
        {trailing}
      </div>

      {error ? <p className="mt-1.5 text-caption text-danger">{error}</p> : null}
    </div>
  );
}
