import { Check } from 'lucide-react';
import { cn } from '@/shared/utils/cn.js';

/**
 * The circular checkbox on a task row. Completing a task pops the check;
 * un-completing it fades back to an outline.
 *
 * @param {Object} props
 * @param {boolean} props.completed
 * @param {boolean} [props.active] Tints the ring — used for the task in progress.
 * @param {boolean} [props.disabled]
 * @param {string} props.label Accessible name, e.g. "Complete Design system update".
 * @param {() => void} props.onToggle
 * @param {string} [props.className]
 */
export default function TaskStatusToggle({
  completed,
  active = false,
  disabled = false,
  label,
  onToggle,
  className,
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={completed}
      aria-label={label}
      disabled={disabled}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onToggle();
      }}
      className={cn(
        'press flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2',
        'transition-colors duration-fast disabled:opacity-60',
        completed
          ? 'border-success bg-success text-white'
          : active
            ? 'border-primary bg-primary-soft text-transparent'
            : 'border-line-strong bg-surface text-transparent',
        className,
      )}
    >
      {completed ? <Check size={14} strokeWidth={3} className="animate-check-pop" /> : null}
    </button>
  );
}
