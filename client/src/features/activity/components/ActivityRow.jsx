import { IconBadge } from '@/shared/components';
import { cn } from '@/shared/utils/cn.js';

/**
 * One entry in the activity feed: small icon, what happened, when.
 * Deliberately a row, not a card.
 *
 * @param {Object} props
 * @param {import('../services/activityMapper.js').ActivityItem} props.item
 * @param {(id: string) => void} [props.onPress]
 */
export default function ActivityRow({ item, onPress }) {
  const Icon = item.icon;

  return (
    <button
      type="button"
      onClick={() => onPress?.(item.id)}
      className={cn(
        'press-sm flex w-full items-start gap-3 px-4 py-3.5 text-left',
        'transition-colors duration-fast active:bg-surface-muted',
      )}
    >
      <IconBadge icon={<Icon />} tone={item.tone} size="sm" className="mt-0.5" />

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="truncate text-bodysm font-semibold text-ink">{item.title}</span>
          {item.unread ? <span aria-label="Unread" className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> : null}
        </span>
        <span className="mt-0.5 block truncate text-sub text-ink-muted">{item.description}</span>
        <span className="mt-1 block text-caption text-ink-faint">{item.timeLabel}</span>
      </span>
    </button>
  );
}
