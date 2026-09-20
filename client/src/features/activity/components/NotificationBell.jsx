import { Bell } from 'lucide-react';
import { ROUTES } from '@/app/navigation/routes.js';
import { IconButton } from '@/shared/components';
import { useActivity } from '../hooks/useActivity.js';

/**
 * Header bell with an unread indicator; opens the activity feed.
 */
export default function NotificationBell() {
  const { unreadCount } = useActivity({ limit: 10 });

  return (
    <IconButton
      label={unreadCount > 0 ? `Activity, ${unreadCount} unread` : 'Activity'}
      to={ROUTES.activity}
      className="relative"
    >
      <Bell size={21} />
      {unreadCount > 0 ? (
        <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-danger ring-2 ring-app" />
      ) : null}
    </IconButton>
  );
}
