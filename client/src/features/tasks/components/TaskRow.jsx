import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { routeTo } from '@/app/navigation/routes.js';
import { cn } from '@/shared/utils/cn.js';
import { formatDueLabel } from '@/shared/utils/date.js';
import { isCompleted, isInProgress, isOverdue } from '../services/taskRules.js';
import { useSwipeAction } from '../hooks/useSwipeAction.js';
import { useTaskActions } from '../hooks/useTaskActions.js';
import TaskStatusToggle from './TaskStatusToggle.jsx';

/**
 * The single task row used by Home, Calendar, Tasks, Categories and My day.
 *
 * Tapping the circle completes the task, swiping the row sideways does the
 * same, and tapping anywhere else opens the task.
 *
 * @param {Object} props
 * @param {import('@/shared/types').Task} props.task
 * @param {string} [props.subtitle] Overrides the default due-date label.
 * @param {boolean} [props.showChevron]
 * @param {string} [props.className]
 */
export default function TaskRow({ task, subtitle, showChevron = true, className }) {
  const { toggleTask, canToggle } = useTaskActions();
  const done = isCompleted(task);
  const allowed = canToggle(task);

  const { offset, swiping, handlers } = useSwipeAction({
    onActivate: () => toggleTask(task),
    enabled: allowed,
  });

  return (
    <div className="relative overflow-hidden">
      {swiping ? (
        <div
          aria-hidden="true"
          className={cn(
            'absolute inset-0 flex items-center px-5 text-sub font-semibold',
            done ? 'justify-start bg-surface-muted text-ink-muted' : 'justify-start bg-success-soft text-success',
          )}
        >
          {done ? 'Reopen' : 'Complete'}
        </div>
      ) : null}

      <Link
        to={routeTo.taskDetail(task._id)}
        {...handlers}
        style={{ transform: `translateX(${offset}px)` }}
        className={cn(
          'relative flex min-h-touch items-center gap-3 bg-surface px-4 py-3',
          'active:bg-surface-muted',
          // While dragging the row must track the finger exactly; afterwards it springs back.
          swiping ? 'transition-none' : 'transition duration-fast ease-out',
          className,
        )}
      >
        <TaskStatusToggle
          completed={done}
          active={isInProgress(task)}
          disabled={!allowed}
          label={`${done ? 'Reopen' : 'Complete'} ${task.title}`}
          onToggle={() => toggleTask(task)}
        />

        <span className="min-w-0 flex-1">
          <span
            className={cn(
              'block truncate text-bodysm font-semibold',
              done ? 'text-ink-faint line-through decoration-ink-faint/60' : 'text-ink',
            )}
          >
            {task.title}
          </span>
          <span
            className={cn(
              'mt-0.5 block truncate text-caption',
              !done && isOverdue(task) ? 'font-semibold text-danger' : 'text-ink-muted',
            )}
          >
            {subtitle ?? formatDueLabel(task.end_date)}
          </span>
        </span>

        {showChevron ? <ChevronRight size={18} className="shrink-0 text-ink-faint" /> : null}
      </Link>
    </div>
  );
}
