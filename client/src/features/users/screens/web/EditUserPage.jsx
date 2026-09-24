import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserX } from 'lucide-react';
import { ROUTES } from '@/app/navigation/routes.js';
import {
  Avatar,
  Badge,
  Button,
  ConfirmDialog,
  EmptyState,
  InputField,
  ListRow,
  Page,
  PageHeader,
  Panel,
  RowGroup,
  Spinner,
} from '@/shared/components';
import { useDisclosure } from '@/shared/hooks';
import { entityId } from '@/shared/utils/entity.js';
import { isValid, validateEmail, validateName } from '@/shared/utils/validation.js';
import { useCurrentUser } from '@/features/auth';
import { ROLE_LABELS } from '@/shared/constants/roles.js';
import { useUser } from '../../hooks/useUsers.js';
import { useDeleteUser, useUpdateUser } from '../../hooks/useUserMutations.js';

/**
 * Edit one team member on the web.
 */
export default function EditUserPage() {
  const { id = '' } = useParams();
  const { user, isLoading } = useUser(id);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <Page width="narrow">
        <EmptyState
          title="Person not found"
          description="They may have been removed from the workspace."
          action={
            <Button to={ROUTES.users} variant="secondary" fullWidth>
              Back to team
            </Button>
          }
        />
      </Page>
    );
  }

  return <EditUserFormPage user={user} />;
}

/**
 * @param {Object} props
 * @param {import('@/shared/types').User} props.user
 */
function EditUserFormPage({ user }) {
  const navigate = useNavigate();
  const { isAdmin } = useCurrentUser();
  const deactivateDialog = useDisclosure();
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
    <Page width="narrow">
      <PageHeader
        title={user.name}
        description={ROLE_LABELS[user.role]}
        actions={
          <>
            <Button variant="secondary" size="md" onClick={() => navigate(ROUTES.users)}>
              Cancel
            </Button>
            <Button size="md" onClick={submit} loading={isPending}>
              Save changes
            </Button>
          </>
        }
      />

      <Panel>
        <div className="flex items-center gap-4 border-b border-line pb-5">
          <Avatar name={values.name} size="lg" />
          <div className="min-w-0">
            <p className="truncate text-section">{values.name}</p>
            <Badge tone={values.active ? 'success' : 'neutral'} className="mt-1.5">
              {values.active ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <InputField
            name="user-name"
            label="Full name"
            value={values.name}
            onChange={(value) => setValues((current) => ({ ...current, name: value }))}
            error={errors.name}
          />
          <InputField
            name="user-email"
            type="email"
            label="Email address"
            value={values.email}
            onChange={(value) => setValues((current) => ({ ...current, email: value }))}
            error={errors.email}
          />
        </div>
      </Panel>

      <Panel className="mt-5" title="Access" padding="none">
        <RowGroup className="rounded-none border-0">
          <ListRow
            label={values.active ? 'Account active' : 'Account disabled'}
            description={values.active ? 'Can sign in and receive tasks' : 'Cannot sign in'}
            chevron={false}
            onClick={() => setValues((current) => ({ ...current, active: !current.active }))}
            value={values.active ? 'On' : 'Off'}
          />
        </RowGroup>
      </Panel>

      {isAdmin ? (
        <div className="mt-5">
          <Button
            variant="danger"
            size="md"
            onClick={deactivateDialog.show}
            leadingIcon={<UserX size={16} />}
          >
            Deactivate account
          </Button>
        </div>
      ) : null}

      <ConfirmDialog
        open={deactivateDialog.open}
        onClose={deactivateDialog.hide}
        onConfirm={() => removeUser(id)}
        title={`Deactivate ${user.name}?`}
        message="They will lose access to TaskFlow until the account is re-enabled."
        confirmLabel="Deactivate"
      />
    </Page>
  );
}
