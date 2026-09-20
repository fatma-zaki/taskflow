import { Activity, CircleGauge, Settings, Users } from 'lucide-react';
import { ROUTES } from '@/app/navigation/routes.js';
import { IconBadge, ListRow, RowGroup, Screen, ScreenHeader } from '@/shared/components';
import { useCurrentUser } from '@/features/auth';
import ProfileSummary from '../components/ProfileSummary.jsx';

/**
 * The "More" tab: everything that does not deserve a tab of its own.
 */
export default function MoreScreen() {
  const { user, isManager } = useCurrentUser();

  return (
    <Screen header={<ScreenHeader title="More" align="start" />}>
      <div className="mt-1">
        <ProfileSummary user={user} to={ROUTES.profile} />
      </div>

      <RowGroup className="mt-4">
        <ListRow
          label="My day"
          description="Today's progress"
          leading={<IconBadge icon={<CircleGauge />} tone="primary" />}
          to={ROUTES.myDay}
        />
        <ListRow
          label="Recent activity"
          description="Assignments and updates"
          leading={<IconBadge icon={<Activity />} tone="info" />}
          to={ROUTES.activity}
        />
        {isManager ? (
          <ListRow
            label="Team"
            description="People and their tasks"
            leading={<IconBadge icon={<Users />} tone="success" />}
            to={ROUTES.users}
          />
        ) : null}
        <ListRow
          label="Settings"
          leading={<IconBadge icon={<Settings />} tone="neutral" />}
          to={ROUTES.settings}
        />
      </RowGroup>
    </Screen>
  );
}
