import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@/app/navigation/routes.js';
import {
  Avatar,
  Button,
  Card,
  ConfirmSheet,
  ListRow,
  RowGroup,
  Screen,
  ScreenHeader,
  Spinner,
  TextField,
} from '@/shared/components';
import { useDisclosure } from '@/shared/hooks';
import { entityId } from '@/shared/utils/entity.js';
import { isValid, validateEmail, validateName } from '@/shared/utils/validation.js';
import { useCurrentUser } from '@/features/auth';
import { useUser } from '../hooks/useUsers.js';
import { useDeleteUser, useUpdateUser } from '../hooks/useUserMutations.js';

/**
 * Edit a team member: their details, whether their account is active, and —
 * for admins — removal.
 */
export default function EditUserScreen() {
  const { id = '' } = useParams();
  const { user, isLoading } = useUser(id);

  if (isLoading) {
    return (
      <div className="flex min-h-full items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <Screen header={<ScreenHeader title="Team member" showBack backTo={ROUTES.users} />}>
        <p className="pt-6 text-bodysm text-ink-muted">This person is no longer in the team.</p>
      </Screen>
    );
  }

  return <EditUserForm user={user} />;
}

/**
 * @param {Object} props
 * @param {import('@/shared/types').User} props.user
 */
function EditUserForm({ user }) {
  const navigate = useNavigate();
  const { isAdmin } = useCurrentUser();
  const deleteSheet = useDisclosure();
  const id = entityId(user) ?? '';

  const [values, setValues] = useState({ name: user.name, email: user.email, active: user.active ?? true });
  const [errors, setErrors] = useState(
    /** @type {{ name: string | null, email: string | null }} */ ({ name: null, email: null }),
  );

  const { saveUser, isPending } = useUpdateUser(id, { onSaved: () => navigate(ROUTES.users) });
  const { removeUser } = useDeleteUser({ onDeleted: () => navigate(ROUTES.users, { replace: true }) });

  const submit = () => {
    const nextErrors = { name: validateName(values.name), email: validateEmail(values.email) };
    setErrors(nextErrors);
    if (isValid(nextErrors)) saveUser(values);
  };

  return (
    <Screen
      header={<ScreenHeader title="Team member" showBack backTo={ROUTES.users} />}
      footer={
        <Button fullWidth onClick={submit} loading={isPending}>
          Save changes
        </Button>
      }
    >
      <div className="flex flex-col items-center pt-4">
        <Avatar name={values.name} size="lg" />
      </div>

      <Card padding="none" className="mt-6 divide-y divide-line">
        <TextField
          name="user-name"
          value={values.name}
          onChange={(value) => setValues((current) => ({ ...current, name: value }))}
          label="Full name"
          placeholder="Full name"
          error={errors.name}
        />
        <TextField
          name="user-email"
          type="email"
          value={values.email}
          onChange={(value) => setValues((current) => ({ ...current, email: value }))}
          label="Email address"
          placeholder="Email address"
          error={errors.email}
        />
      </Card>

      <RowGroup className="mt-3">
        <ListRow
          label={values.active ? 'Account active' : 'Account disabled'}
          description={values.active ? 'Can sign in and receive tasks' : 'Cannot sign in'}
          chevron={false}
          onClick={() => setValues((current) => ({ ...current, active: !current.active }))}
          value={values.active ? 'On' : 'Off'}
        />
      </RowGroup>

      {isAdmin ? (
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={deleteSheet.show}
            className="press min-h-touch px-4 text-sub font-semibold text-danger"
          >
            Remove from team
          </button>
        </div>
      ) : null}

      <ConfirmSheet
        open={deleteSheet.open}
        onClose={deleteSheet.hide}
        onConfirm={() => removeUser(id)}
        title={`Remove ${values.name}?`}
        message="They will lose access to TaskFlow."
        confirmLabel="Remove"
      />
    </Screen>
  );
}
