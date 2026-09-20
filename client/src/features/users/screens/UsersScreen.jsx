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
import { useUsers } from '../hooks/useUsers.js';
import CreateUserSheet from '../components/CreateUserSheet.jsx';

/** @type {Record<import('@/shared/types').UserRole, { label: string, tone: import('@/shared/theme/tones.js').Tone }>} */
const ROLE_BADGE = {
  admin: { label: 'Admin', tone: 'primary' },
  manager: { label: 'Manager', tone: 'info' },
  user: { label: 'Member', tone: 'neutral' },
};

/**
 * Team list for managers and admins.
 */
export default function UsersScreen() {
  const [search, setSearch] = useState('');
  const createSheet = useDisclosure();
  const { users, isLoading } = useUsers();

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return users;
    return users.filter(
      (user) => user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term),
    );
  }, [users, search]);

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
                const badge = ROLE_BADGE[user.role];
                const id = entityId(user) ?? '';

                return (
                  <ListRow
                    key={id}
                    label={user.name}
                    description={user.email}
                    leading={<Avatar name={user.name} size="sm" />}
                    value={<Badge tone={badge.tone}>{badge.label}</Badge>}
                    to={routeTo.userEdit(id)}
                  />
                );
              })}
            </RowGroup>
          )}
        </div>
      </Screen>

      <Fab label="Add a team member" onClick={createSheet.show} />
      <CreateUserSheet open={createSheet.open} onClose={createSheet.hide} />
    </>
  );
}
