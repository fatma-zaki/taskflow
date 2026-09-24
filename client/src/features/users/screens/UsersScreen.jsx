import { useMemo, useState } from 'react';
import { ROUTES, routeTo } from '@/app/navigation/routes.js';
import {
  Avatar,
  Badge,
  EmptyState,
  Fab,
  ListRow,
  RowGroup,
  Screen,
  ScreenHeader,
  SearchInput,
  Skeleton,
} from '@/shared/components';
import { useDisclosure } from '@/shared/hooks';
import { entityId } from '@/shared/utils/entity.js';
import { ROLE_LABELS, ROLE_TONES } from '@/shared/constants/roles.js';
import { useCurrentUser } from '@/features/auth';
import { useUsers } from '../hooks/useUsers.js';
import { canEditUser, filterUsers } from '../services/userRules.js';
import CreateUserDialog from '../components/CreateUserDialog.jsx';

/**
 * Team list on a phone. Same permission rules as the web page — they live in
 * `userRules`, not in either screen.
 */
export default function UsersScreen() {
  const { user: currentUser, isAdmin, isManager } = useCurrentUser();
  const [search, setSearch] = useState('');
  const createDialog = useDisclosure();
  const { users, isLoading } = useUsers();

  const actor = { current: currentUser, isAdmin, isManager };
  const visible = useMemo(() => filterUsers(users, { search }), [users, search]);

  return (
    <>
      <Screen header={<ScreenHeader title="Team" showBack backTo={ROUTES.more} />}>
        <SearchInput value={search} onChange={setSearch} placeholder="Search people..." className="mt-1" />

        <div className="mt-5">
          {isLoading ? (
            <div className="space-y-2.5">
              {Array.from({ length: 5 }).map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key -- placeholders have no identity
                <Skeleton key={index} className="h-16 rounded-card" />
              ))}
            </div>
          ) : visible.length === 0 ? (
            <EmptyState title="No people found" description="Try another name or email." />
          ) : (
            <RowGroup>
              {visible.map((user) => {
                const id = entityId(user) ?? '';
                const editable = canEditUser(user, actor);

                return (
                  <ListRow
                    key={id}
                    label={user.name}
                    description={user.email}
                    leading={<Avatar name={user.name} size="sm" />}
                    value={<Badge tone={ROLE_TONES[user.role]}>{ROLE_LABELS[user.role]}</Badge>}
                    to={editable ? routeTo.userEdit(id) : undefined}
                    chevron={editable}
                  />
                );
              })}
            </RowGroup>
          )}
        </div>
      </Screen>

      {isAdmin ? (
        <>
          <Fab label="Add a team member" onClick={createDialog.show} />
          <CreateUserDialog open={createDialog.open} onClose={createDialog.hide} />
        </>
      ) : null}
    </>
  );
}
