import { Avatar, ListRow, RowGroup } from '@/shared/components';

/**
 * The account row that opens the profile editor.
 *
 * @param {Object} props
 * @param {import('@/shared/types').User | null} props.user
 * @param {string} props.to
 */
export default function ProfileSummary({ user, to }) {
  return (
    <RowGroup>
      <ListRow
        label={user?.name ?? 'Your account'}
        description={user?.email}
        leading={<Avatar name={user?.name} />}
        to={to}
        className="py-3.5"
      />
    </RowGroup>
  );
}
