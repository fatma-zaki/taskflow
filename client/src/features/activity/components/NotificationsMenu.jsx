import { Bell } from 'lucide-react';
import { ROUTES } from '@/app/navigation/routes.js';
import { IconBadge, MenuDropdown, Spinner, TextLink } from '@/shared/components';
import { cn } from '@/shared/utils/cn.js';
import { useActivity, useActivityActions } from '../hooks/useActivity.js';

const PREVIEW_COUNT = 6;

/**
 * The web top bar's bell: unread badge plus a preview of recent activity.
 * Reuses the same hooks and mapper as the Activity screen.
 */
export default function NotificationsMenu() {
  const { items, unreadCount, isLoading } = useActivity({ limit: PREVIEW_COUNT });
  const { markRead, markAllRead } = useActivityActions();

  return (
    <MenuDropdown
      panelClassName="w-80"
      trigger={({ toggle }) => (
        <button
          type="button"
          onClick={toggle}
          aria-label={unreadCount > 0 ? `Activity, ${unreadCount} unread` : 'Activity'}
          className="press relative flex h-10 w-10 items-center justify-center rounded-md text-ink-muted transition-colors duration-fast hover:bg-surface-muted hover:text-ink"
        >
          <Bell size={19} />
          {unreadCount > 0 ? (
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger ring-2 ring-surface" />
          ) : null}
        </button>
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <p className="text-bodysm font-bold text-ink">Activity</p>
        {unreadCount > 0 ? (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              markAllRead();
            }}
            className="text-sub font-semibold text-ink-muted transition-colors hover:text-ink"
          >
            Mark all read
          </button>
        ) : null}
      </div>

      <div className="max-h-80 overflow-y-auto" data-scroll-area>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Spinner size="sm" />
          </div>
        ) : items.length === 0 ? (
          <p className="px-4 py-8 text-center text-sub text-ink-muted">Nothing yet.</p>
        ) : (
          items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => markRead(item.id)}
                className={cn(
                  'flex w-full items-start gap-3 border-b border-line px-4 py-3 text-left last:border-0',
                  'transition-colors duration-fast hover:bg-surface-muted',
                  item.unread && 'bg-primary-tint/60',
                )}
              >
                <IconBadge icon={<Icon />} tone={item.tone} size="sm" className="mt-0.5" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sub font-semibold text-ink">{item.title}</span>
                  <span className="mt-0.5 block truncate text-caption text-ink-muted">{item.description}</span>
                  <span className="mt-1 block text-caption text-ink-faint">{item.timeLabel}</span>
                </span>
              </button>
            );
          })
        )}
      </div>

      <div className="border-t border-line px-4 py-3">
        <TextLink to={ROUTES.activity}>View all activity</TextLink>
      </div>
    </MenuDropdown>
  );
}
