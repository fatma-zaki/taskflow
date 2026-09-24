import { RowGroup } from '@/shared/components';
import ActivityRow from './ActivityRow.jsx';

/**
 * @param {Object} props
 * @param {import('../services/activityMapper.js').ActivityItem[]} props.items
 * @param {(id: string) => void} [props.onPress]
 * @param {string} [props.className]
 */
export default function ActivityList({ items, onPress, className }) {
  if (items.length === 0) return null;

  return (
    <RowGroup className={className}>
      {items.map((item) => (
        <ActivityRow key={item.id} item={item} onPress={onPress} />
      ))}
    </RowGroup>
  );
}
