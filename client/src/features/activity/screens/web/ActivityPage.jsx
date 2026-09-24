import { useMemo, useState } from 'react';
import { CheckCheck } from 'lucide-react';
import { Button, EmptyState, FilterChips, Page, PageHeader, Panel, Skeleton } from '@/shared/components';
import { useActivity, useActivityActions } from '../../hooks/useActivity.js';
import ActivityList from '../../components/ActivityList.jsx';

/** @type {{ value: 'all' | 'unread' | 'read', label: string }[]} */
const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'unread', label: 'Unread' },
  { value: 'read', label: 'Read' },
];

/**
 * Recent activity on the web: the full feed with a read/unread filter.
 */
export default function ActivityPage() {
  const [filter, setFilter] = useState(/** @type {'all' | 'unread' | 'read'} */ ('all'));
  const { items, unreadCount, isLoading } = useActivity();
  const { markRead, markAllRead } = useActivityActions();

  const visible = useMemo(() => {
    if (filter === 'unread') return items.filter((item) => item.unread);
    if (filter === 'read') return items.filter((item) => !item.unread);
    return items;
  }, [items, filter]);

  return (
    <Page width="narrow">
      <PageHeader
        title="Recent activity"
        description={
          unreadCount > 0
            ? `${unreadCount} unread ${unreadCount === 1 ? 'update' : 'updates'}`
            : 'You are all caught up.'
        }
        actions={
          unreadCount > 0 ? (
            <Button
              variant="secondary"
              size="md"
              onClick={() => markAllRead()}
              leadingIcon={<CheckCheck size={16} />}
            >
              Mark all read
            </Button>
          ) : null
        }
      />

      <FilterChips options={FILTERS} value={filter} onChange={setFilter} label="Filter activity" />

      <Panel className="mt-5" padding="none">
        {isLoading ? (
          <div className="space-y-3 p-5">
            {Array.from({ length: 5 }).map((_, index) => (
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
        ) : visible.length === 0 ? (
          <EmptyState
            title="Nothing here"
            description="Assignments, reminders and completed work will show up here."
          />
        ) : (
          <ActivityList items={visible} onPress={markRead} className="rounded-none border-0" />
        )}
      </Panel>
    </Page>
  );
}
