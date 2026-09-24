import { Avatar, ListRow, RowGroup } from '@/shared/components';

/**
 * The account row that opens the profile editor.
 *
 * @param {Object} props
 * @param {import('@/shared/types').User | null} props.user
 * @param {string} props.to
 * @param {string} [props.className]
 */
export default function ProfileSummary({ user, to, className }) {
  return (
    <RowGroup className={className}>
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
