import { useNavigate } from 'react-router-dom';
import { Bell, Globe, HelpCircle, Info, LogOut, Sun } from 'lucide-react';
import { ROUTES } from '@/app/navigation/routes.js';
import { ConfirmDialog, IconBadge, ListRow, RowGroup, Screen, ScreenHeader } from '@/shared/components';
import { useDisclosure } from '@/shared/hooks';
import { useAppDispatch } from '@/app/store/hooks.js';
import { logout, useCurrentUser } from '@/features/auth';
import { APP_INFO, APP_PREFERENCES } from '../constants/appPreferences.js';
import ProfileSummary from '../components/ProfileSummary.jsx';

/**
 * Screen 7 — Settings. Account first, then preferences, then the one
 * destructive action, set apart at the bottom.
 */
export default function SettingsScreen() {
  const { user } = useCurrentUser();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logoutDialog = useDisclosure();

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.login, { replace: true });
  };

  return (
    <Screen header={<ScreenHeader title="Settings" showBack backTo={ROUTES.more} />}>
      <div className="mt-1">
        <ProfileSummary user={user} to={ROUTES.profile} />
      </div>

      <RowGroup className="mt-4">
        <ListRow
          label="Notifications"
          leading={<IconBadge icon={<Bell />} tone="primary" />}
          to={ROUTES.notificationRules}
        />
        <ListRow
          label="Appearance"
          leading={<IconBadge icon={<Sun />} tone="warning" />}
          value={APP_PREFERENCES.appearance}
          chevron={false}
        />
        <ListRow
          label="Language"
          leading={<IconBadge icon={<Globe />} tone="info" />}
          value={APP_PREFERENCES.language}
          chevron={false}
        />
      </RowGroup>

      <RowGroup className="mt-4">
        <ListRow
          label="Help & Support"
          leading={<IconBadge icon={<HelpCircle />} tone="neutral" />}
          description={APP_INFO.supportEmail}
          onClick={() => {
            window.location.href = `mailto:${APP_INFO.supportEmail}`;
          }}
        />
        <ListRow
          label="About TaskFlow"
          leading={<IconBadge icon={<Info />} tone="neutral" />}
          to={ROUTES.about}
        />
      </RowGroup>

      <RowGroup className="mt-4">
        <ListRow
          label="Log out"
          intent="danger"
          chevron={false}
          leading={<IconBadge icon={<LogOut />} tone="danger" />}
          onClick={logoutDialog.show}
        />
      </RowGroup>

      <ConfirmDialog
        open={logoutDialog.open}
        onClose={logoutDialog.hide}
        onConfirm={handleLogout}
        title="Log out of TaskFlow?"
        message="You'll need to sign in again to see your tasks."
        confirmLabel="Log out"
      />
    </Screen>
  );
}
