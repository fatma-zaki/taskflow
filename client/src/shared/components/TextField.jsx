import { cn } from '@/shared/utils/cn.js';

/**
 * A borderless, full-width text input sized for touch. Forms stack these on a
 * surface rather than boxing every field — see `FormSurface`.
 *
 * @param {Object} props
 * @param {string} props.name
 * @param {string} props.value
 * @param {(value: string) => void} props.onChange
 * @param {string} [props.placeholder]
 * @param {string} [props.label] Accessible name; rendered only for screen readers.
 * @param {string | null} [props.error]
 * @param {() => void} [props.onBlur]
 * @param {'text' | 'email' | 'password'} [props.type]
 * @param {boolean} [props.autoFocus]
 * @param {import('react').ReactNode} [props.leading]
 * @param {import('react').ReactNode} [props.trailing]
 * @param {string} [props.className]
 */
export default function TextField({
  name,
  value,
  onChange,
  placeholder,
  label,
  error,
  onBlur,
  type = 'text',
  autoFocus = false,
  leading,
  trailing,
  className,
}) {
  return (
    <div className={className}>
      <div className="flex min-h-touch items-center gap-3 px-4">
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
          // eslint-disable-next-line jsx-a11y/no-autofocus -- intentional on single-purpose mobile forms
          autoFocus={autoFocus}
          className={cn(
            'w-full bg-transparent py-3 text-body text-ink placeholder:text-ink-faint focus:outline-none',
          )}
        />
        {trailing}
      </div>
      {error ? <p className="px-4 pb-2 text-caption text-danger">{error}</p> : null}
    </div>
  );
}
