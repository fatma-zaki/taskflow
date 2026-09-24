import { useNavigate } from 'react-router-dom';
import { Bell, Globe, HelpCircle, Info, LogOut, Sun } from 'lucide-react';
import { ROUTES } from '@/app/navigation/routes.js';
import {
  Button,
  ConfirmDialog,
  IconBadge,
  ListRow,
  Page,
  PageHeader,
  Panel,
  RowGroup,
} from '@/shared/components';
import { useDisclosure } from '@/shared/hooks';
import { useAppDispatch } from '@/app/store/hooks.js';
import { logout, useCurrentUser } from '@/features/auth';
import { APP_INFO, APP_PREFERENCES } from '../../constants/appPreferences.js';
import ProfileSummary from '../../components/ProfileSummary.jsx';

/**
 * Settings on the web: account, preferences, support, and the one destructive
 * action kept apart from the rest.
 */
export default function SettingsPage() {
  const { user } = useCurrentUser();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logoutDialog = useDisclosure();

  return (
    <Page width="narrow">
      <PageHeader title="Settings" description="Your account and how TaskFlow behaves." />

      <div className="space-y-5">
        <Panel title="Account" padding="none">
          <ProfileSummary user={user} to={ROUTES.profile} className="rounded-none border-0" />
        </Panel>

        <Panel title="Preferences" padding="none">
          <RowGroup className="rounded-none border-0">
            <ListRow
              label="Notifications"
              description="Reminder schedule and what gets sent"
              leading={<IconBadge icon={<Bell />} tone="primary" />}
              to={ROUTES.notificationRules}
            />
            <ListRow
              label="Appearance"
              description="TaskFlow ships in light mode"
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
        </Panel>

        <Panel title="Support" padding="none">
          <RowGroup className="rounded-none border-0">
            <ListRow
              label="Help & Support"
              description={APP_INFO.supportEmail}
              leading={<IconBadge icon={<HelpCircle />} tone="neutral" />}
              onClick={() => {
                window.location.href = `mailto:${APP_INFO.supportEmail}`;
              }}
            />
            <ListRow
              label="About TaskFlow"
              description={`Version ${APP_INFO.version}`}
              leading={<IconBadge icon={<Info />} tone="neutral" />}
              to={ROUTES.about}
            />
          </RowGroup>
        </Panel>

        <div>
          <Button variant="danger" size="md" onClick={logoutDialog.show} leadingIcon={<LogOut size={16} />}>
            Log out
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={logoutDialog.open}
        onClose={logoutDialog.hide}
        onConfirm={() => {
          dispatch(logout());
          navigate(ROUTES.login, { replace: true });
        }}
        title="Log out of TaskFlow?"
        message="You'll need to sign in again to see your tasks."
        confirmLabel="Log out"
      />
    </Page>
  );
}
