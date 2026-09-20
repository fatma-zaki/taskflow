import { useNavigate } from 'react-router-dom';
import { AtSign, UserRound } from 'lucide-react';
import { ROUTES } from '@/app/navigation/routes.js';
import { Avatar, Badge, Button, Card, Screen, ScreenHeader, TextField } from '@/shared/components';
import { useCurrentUser } from '@/features/auth';
import { useProfileForm } from '../hooks/useProfileForm.js';

/** @type {Record<import('@/shared/types').UserRole, string>} */
const ROLE_LABELS = { admin: 'Admin', manager: 'Manager', user: 'Member' };

/**
 * Edit your own name and email.
 */
export default function ProfileScreen() {
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const { values, errors, setField, save, isSaving, isDirty } = useProfileForm({
    onSaved: () => navigate(ROUTES.settings),
  });

  return (
    <Screen
      header={<ScreenHeader title="Profile" showBack backTo={ROUTES.settings} />}
      footer={
        <Button fullWidth onClick={save} loading={isSaving} disabled={!isDirty}>
          Save changes
        </Button>
      }
    >
      <div className="flex flex-col items-center pt-4">
        <Avatar name={values.name || user?.name} size="lg" />
        <p className="mt-3 text-section">{values.name || user?.name}</p>
        {user?.role ? <Badge tone="primary" className="mt-2">{ROLE_LABELS[user.role]}</Badge> : null}
      </div>

      <Card padding="none" className="mt-6 divide-y divide-line">
        <TextField
          name="name"
          value={values.name}
          onChange={(value) => setField('name', value)}
          label="Full name"
          placeholder="Your name"
          error={errors.name}
          leading={<UserRound size={18} className="text-ink-faint" />}
        />
        <TextField
          name="email"
          type="email"
          value={values.email}
          onChange={(value) => setField('email', value)}
          label="Email address"
          placeholder="you@company.com"
          error={errors.email}
          leading={<AtSign size={18} className="text-ink-faint" />}
        />
      </Card>
    </Screen>
  );
}
