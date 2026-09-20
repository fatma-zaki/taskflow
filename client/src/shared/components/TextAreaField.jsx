import { cn } from '@/shared/utils/cn.js';

/**
 * @param {Object} props
 * @param {string} props.name
 * @param {string} props.value
 * @param {(value: string) => void} props.onChange
 * @param {string} [props.placeholder]
 * @param {string} [props.label]
 * @param {number} [props.rows]
 * @param {string} [props.className]
 */
export default function TextAreaField({
  name,
  value,
  onChange,
  placeholder,
  label,
  rows = 4,
  className,
}) {
  return (
    <textarea
      id={name}
      name={name}
      rows={rows}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      aria-label={label ?? placeholder}
      className={cn(
        'w-full resize-none bg-transparent px-4 py-3 text-body text-ink',
        'placeholder:text-ink-faint focus:outline-none',
        className,
      )}
    />
  );
}
