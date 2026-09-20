import { RowGroup } from '@/shared/components';
import ActivityRow from './ActivityRow.jsx';

/**
 * @param {Object} props
 * @param {import('../services/activityMapper.js').ActivityItem[]} props.items
 * @param {(id: string) => void} [props.onPress]
 */
export default function ActivityList({ items, onPress }) {
  if (items.length === 0) return null;

  return (
    <RowGroup>
      {items.map((item) => (
        <ActivityRow key={item.id} item={item} onPress={onPress} />
      ))}
    </RowGroup>
  );
}
