import { RowGroup } from '@/shared/components';
import TaskRow from './TaskRow.jsx';

/**
 * A grouped surface of task rows.
 *
 * @param {Object} props
 * @param {import('@/shared/types').Task[]} props.tasks
 * @param {(task: import('@/shared/types').Task) => string} [props.subtitleFor]
 * @param {string} [props.className]
 */
export default function TaskList({ tasks, subtitleFor, className }) {
  if (tasks.length === 0) return null;

  return (
    <RowGroup className={className}>
      {tasks.map((task) => (
        <TaskRow key={task._id} task={task} subtitle={subtitleFor?.(task)} />
      ))}
    </RowGroup>
  );
}
