import { Section } from '@/shared/components';
import { taskCopy } from '../constants/taskCopy.js';
import TaskList from './TaskList.jsx';

/**
 * Renders the Overdue / Today / Upcoming / Completed groups, skipping any that
 * are empty.
 *
 * @param {Object} props
 * @param {import('../services/taskRules.js').TaskBuckets} props.buckets
 */
export default function TaskGroups({ buckets }) {
  /** @type {{ key: keyof import('../services/taskRules.js').TaskBuckets, label: string }[]} */
  const groups = [
    { key: 'overdue', label: taskCopy.groups.overdue },
    { key: 'today', label: taskCopy.groups.today },
    { key: 'upcoming', label: taskCopy.groups.upcoming },
    { key: 'completed', label: taskCopy.groups.completed },
  ];

  return (
    <>
      {groups.map(({ key, label }) => {
        const tasks = buckets[key];
        if (tasks.length === 0) return null;

        return (
          <Section key={key} title={label} count={tasks.length}>
            <TaskList tasks={tasks} />
          </Section>
        );
      })}
    </>
  );
}
