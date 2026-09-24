import { Link } from 'react-router-dom';
import { routeTo } from '@/app/navigation/routes.js';
import { Avatar, DataTable } from '@/shared/components';
import { cn } from '@/shared/utils/cn.js';
import { formatRelativeDay, formatTime } from '@/shared/utils/date.js';
import { populated } from '@/shared/utils/entity.js';
import { isCompleted, isInProgress, isOverdue } from '../../services/taskRules.js';
import { useTaskActions } from '../../hooks/useTaskActions.js';
import TaskStatusToggle from '../TaskStatusToggle.jsx';
import { PriorityBadge, StatusBadge } from '../TaskBadges.jsx';

/**
 * The web task table. Columns are declared here once and reused by every page
 * that lists tasks, so the columns cannot drift apart.
 *
 * @param {Object} props
 * @param {import('@/shared/types').Task[]} props.tasks
 * @param {boolean} [props.isLoading]
 * @param {import('react').ReactNode} [props.empty]
 * @param {boolean} [props.showPeople] Adds the assignee and reporter columns.
 */
export default function TaskTable({ tasks, isLoading = false, empty, showPeople = true }) {
  const { toggleTask, canToggle } = useTaskActions();

  /** @type {import('@/shared/components/web/DataTable.jsx').Column<import('@/shared/types').Task>[]} */
  const columns = [
    {
      id: 'status-toggle',
      width: 'w-12',
      render: (task) => (
        <TaskStatusToggle
          completed={isCompleted(task)}
          active={isInProgress(task)}
          disabled={!canToggle(task)}
          label={`${isCompleted(task) ? 'Reopen' : 'Complete'} ${task.title}`}
          onToggle={() => toggleTask(task)}
        />
      ),
    },
    {
      id: 'title',
      header: 'Task',
      render: (task) => (
        <Link to={routeTo.taskDetail(task._id)} className="block min-w-0">
          <span
            className={cn(
              'block truncate text-bodysm font-semibold transition-colors',
              isCompleted(task) ? 'text-ink-faint line-through' : 'text-ink hover:text-primary-strong',
            )}
          >
            {task.title}
          </span>
          {task.description ? (
            <span className="mt-0.5 block max-w-md truncate text-caption text-ink-muted">
              {task.description}
            </span>
          ) : null}
        </Link>
      ),
    },
    {
      id: 'due',
      header: 'Due',
      render: (task) => (
        <span
          className={cn(
            'whitespace-nowrap text-sub',
            !isCompleted(task) && isOverdue(task) ? 'font-semibold text-danger' : 'text-ink-muted',
          )}
        >
          {formatRelativeDay(task.end_date)} · {formatTime(task.end_date)}
        </span>
      ),
    },
    {
      id: 'status',
      header: 'Stage',
      render: (task) => <StatusBadge status={task.status} />,
    },
    {
      id: 'priority',
      header: 'Priority',
      render: (task) => <PriorityBadge priority={task.priority} />,
    },
    ...(showPeople
      ? [
          {
            id: 'assignee',
            header: 'Assignee',
            /** @param {import('@/shared/types').Task} task */
            render: (task) => <PersonCell user={populated(task.assignee_id)} fallback="Unassigned" />,
          },
          {
            id: 'reporter',
            header: 'Created by',
            /** @param {import('@/shared/types').Task} task */
            render: (task) => <PersonCell user={populated(task.reporter_id)} fallback="—" />,
          },
        ]
      : []),
  ];

  return (
    <DataTable
      columns={columns}
      rows={tasks}
      rowKey={(task) => task._id}
      isLoading={isLoading}
      empty={empty}
    />
  );
}

/**
 * @param {Object} props
 * @param {import('@/shared/types').User | undefined} props.user
 * @param {string} props.fallback
 */
function PersonCell({ user, fallback }) {
  if (!user) return <span className="text-sub text-ink-faint">{fallback}</span>;

  return (
    <span className="flex items-center gap-2">
      <Avatar name={user.name} size="sm" />
      <span className="truncate text-sub text-ink">{user.name}</span>
    </span>
  );
}
