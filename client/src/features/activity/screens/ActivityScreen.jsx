import { CheckCheck, Sparkles } from 'lucide-react';
import { ROUTES } from '@/app/navigation/routes.js';
import {
  Banner,
  EmptyState,
  IconButton,
  Screen,
  ScreenHeader,
  Skeleton,
} from '@/shared/components';
import { useActivity, useActivityActions } from '../hooks/useActivity.js';
import ActivityList from '../components/ActivityList.jsx';

/**
 * Screen 8 — Recent activity. A compact timeline of what happened, newest first.
 */
export default function ActivityScreen() {
  const { items, unreadCount, isLoading } = useActivity();
  const { markRead, markAllRead } = useActivityActions();

  return (
    <Screen
      header={
        <ScreenHeader
          title="Recent activity"
          align="start"
          showBack
          backTo={ROUTES.more}
          action={
            unreadCount > 0 ? (
              <IconButton label="Mark all as read" onClick={() => markAllRead()}>
                <CheckCheck size={20} />
              </IconButton>
            ) : null
          }
        />
      }
    >
      {isLoading ? (
        <div className="mt-2 space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key -- placeholders have no identity
            <div key={index} className="flex gap-3">
              <Skeleton className="h-8 w-8 rounded-sm" />
              <div className="flex-1 space-y-2 py-1">
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-2.5 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          title="Nothing yet"
          description="Assignments, reminders and completed work will show up here."
        />
      ) : (
        <>
          <div className="mt-1">
            <ActivityList items={items} onPress={markRead} />
          </div>

          <Banner
            className="mt-6"
            icon={<Sparkles size={16} />}
            title="Progress, not perfection."
            description="Every closed task counts."
          />
        </>
      )}
    </Screen>
  );
}
