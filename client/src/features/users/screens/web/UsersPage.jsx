import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ListChecks, PenLine, Plus, Search, UserX } from 'lucide-react';
import { routeTo } from '@/app/navigation/routes.js';
import {
  Avatar,
  Badge,
  Button,
  ConfirmDialog,
  DataTable,
  EmptyState,
  InputField,
  Page,
  PageHeader,
  Panel,
  SelectField,
  Toolbar,
} from '@/shared/components';
import { useDisclosure } from '@/shared/hooks';
import { entityId } from '@/shared/utils/entity.js';
import { useCurrentUser } from '@/features/auth';
import { ROLE_LABELS, ROLE_TONES } from '@/shared/constants/roles.js';
import { useUsers } from '../../hooks/useUsers.js';
import { useDeleteUser } from '../../hooks/useUserMutations.js';
import { canDeactivateUser, canEditUser, filterUsers } from '../../services/userRules.js';
import CreateUserDialog from '../../components/CreateUserDialog.jsx';
import UserTasksDialog from '../../components/UserTasksDialog.jsx';

const ROLE_FILTER_OPTIONS = Object.entries(ROLE_LABELS).map(([value, label]) => ({ value, label }));

/**
 * The team list: who is in the workspace, what they can do, and what they are
 * working on.
 */
export default function UsersPage() {
  const { user: currentUser, isAdmin, isManager } = useCurrentUser();
  const { users, isLoading } = useUsers();
  const { removeUser } = useDeleteUser();

  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const createDialog = useDisclosure();
  const [tasksFor, setTasksFor] = useState(/** @type {import('@/shared/types').User | null} */ (null));
  const [pendingRemoval, setPendingRemoval] = useState(
    /** @type {import('@/shared/types').User | null} */ (null),
  );

  const actor = { current: currentUser, isAdmin, isManager };
  const visible = useMemo(() => filterUsers(users, { search, role }), [users, search, role]);

  /** @type {import('@/shared/components/web/DataTable.jsx').Column<import('@/shared/types').User>[]} */
  const columns = [
    {
      id: 'name',
      header: 'Name',
      render: (user) => (
        <span className="flex items-center gap-2.5">
          <Avatar name={user.name} size="sm" />
          <span className="truncate text-bodysm font-semibold text-ink">{user.name}</span>
        </span>
      ),
    },
    {
      id: 'email',
      header: 'Email',
      render: (user) => <span className="truncate text-sub text-ink-muted">{user.email}</span>,
    },
    {
      id: 'role',
      header: 'Role',
      render: (user) => <Badge tone={ROLE_TONES[user.role]}>{ROLE_LABELS[user.role]}</Badge>,
    },
    {
      id: 'status',
      header: 'Status',
      render: (user) =>
        user.active === false ? (
          <Badge tone="neutral">Inactive</Badge>
        ) : (
          <Badge tone="success">Active</Badge>
        ),
    },
    {
      id: 'actions',
      header: 'Actions',
      align: 'right',
      render: (user) => {
        const id = entityId(user) ?? '';

        return (
          <span className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setTasksFor(user)}
              className="inline-flex items-center gap-1.5 text-sub font-semibold text-ink-muted transition-colors hover:text-ink"
            >
              <ListChecks size={15} />
              Tasks
            </button>

            {canEditUser(user, actor) ? (
              <Link
                to={routeTo.userEdit(id)}
                className="inline-flex items-center gap-1.5 text-sub font-semibold text-ink-muted transition-colors hover:text-ink"
              >
                <PenLine size={15} />
                Edit
              </Link>
            ) : null}

            {canDeactivateUser(user, actor) ? (
              <button
                type="button"
                onClick={() => setPendingRemoval(user)}
                className="inline-flex items-center gap-1.5 text-sub font-semibold text-danger transition-colors hover:text-danger/80"
              >
                <UserX size={15} />
                Deactivate
              </button>
            ) : null}
          </span>
        );
      },
    },
  ];

  return (
    <Page>
      <PageHeader
        title="Team"
        description="People in this workspace and what they are working on."
        actions={
          isAdmin ? (
            <Button size="md" onClick={createDialog.show} leadingIcon={<Plus size={17} strokeWidth={2.5} />}>
              Add member
            </Button>
          ) : null
        }
      />

      <Toolbar
        action={
          search || role ? (
            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                setSearch('');
                setRole('');
              }}
            >
              Clear filters
            </Button>
          ) : null
        }
      >
        <InputField
          name="user-search"
          type="search"
          label="Search"
          value={search}
          onChange={setSearch}
          placeholder="Search people..."
          leading={<Search size={16} className="text-ink-faint" />}
        />
        <SelectField
          name="user-role"
          label="Role"
          value={role}
          onChange={setRole}
          options={ROLE_FILTER_OPTIONS}
          placeholder="All roles"
        />
      </Toolbar>

      <Panel className="mt-5" title="All people" count={visible.length} padding="none">
        <DataTable
          columns={columns}
          rows={visible}
          rowKey={(user) => entityId(user) ?? user.email}
          isLoading={isLoading}
          empty={<EmptyState title="No people found" description="Try another name, email or role." />}
        />
      </Panel>

      <CreateUserDialog open={createDialog.open} onClose={createDialog.hide} />

      <UserTasksDialog
        open={Boolean(tasksFor)}
        onClose={() => setTasksFor(null)}
        userId={entityId(tasksFor) ?? null}
        userName={tasksFor?.name}
      />

      <ConfirmDialog
        open={Boolean(pendingRemoval)}
        onClose={() => setPendingRemoval(null)}
        onConfirm={() => {
          const id = entityId(pendingRemoval);
          if (id) removeUser(id);
        }}
        title={`Deactivate ${pendingRemoval?.name ?? 'this person'}?`}
        message="They will no longer be able to sign in. You can re-enable the account later."
        confirmLabel="Deactivate"
      />
    </Page>
  );
}
