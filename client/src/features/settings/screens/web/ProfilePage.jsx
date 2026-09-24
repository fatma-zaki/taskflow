import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/app/navigation/routes.js';
import { Avatar, Badge, Button, InputField, Page, PageHeader, Panel } from '@/shared/components';
import { useCurrentUser } from '@/features/auth';
import { ROLE_LABELS } from '@/shared/constants/roles.js';
import { useProfileForm } from '../../hooks/useProfileForm.js';

/**
 * Your own profile, on the web.
 */
export default function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const { values, errors, setField, save, isSaving, isDirty } = useProfileForm({
    onSaved: () => navigate(ROUTES.settings),
  });

  return (
    <Page width="narrow">
      <PageHeader
        title="Profile"
        description="How you appear to the rest of the team."
        actions={
          <Button size="md" onClick={save} loading={isSaving} disabled={!isDirty}>
            Save changes
          </Button>
        }
      />

      <Panel>
        <div className="flex items-center gap-4 border-b border-line pb-5">
          <Avatar name={values.name || user?.name} size="lg" />
          <div className="min-w-0">
            <p className="truncate text-section">{values.name || user?.name}</p>
            {user?.role ? (
              <Badge tone="primary" className="mt-1.5">
                {ROLE_LABELS[user.role]}
              </Badge>
            ) : null}
          </div>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <InputField
            name="name"
            label="Full name"
            value={values.name}
            onChange={(value) => setField('name', value)}
            placeholder="Your name"
            error={errors.name}
          />
          <InputField
            name="email"
            type="email"
            label="Email address"
            value={values.email}
            onChange={(value) => setField('email', value)}
            placeholder="you@company.com"
            error={errors.email}
          />
        </div>
      </Panel>
    </Page>
  );
}
