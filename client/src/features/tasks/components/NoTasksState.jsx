import { Plus } from 'lucide-react';
import { ROUTES } from '@/app/navigation/routes.js';
import { Button, ClipboardIllustration, EmptyState } from '@/shared/components';
import { taskCopy } from '../constants/taskCopy.js';

/**
 * The "all caught up" state. Shown whenever a task list is legitimately empty,
 * with the create action attached so the screen still offers a next step.
 *
 * @param {Object} props
 * @param {string} [props.title]
 * @param {string} [props.description]
 * @param {boolean} [props.withAction]
 * @param {'compact' | 'comfortable'} [props.size]
 */
export default function NoTasksState({
  title = taskCopy.emptyToday.title,
  description = taskCopy.emptyToday.description,
  withAction = true,
  size = 'comfortable',
}) {
  return (
    <EmptyState
      title={title}
      description={description}
      size={size}
      illustration={<ClipboardIllustration />}
      action={
        withAction ? (
          <Button to={ROUTES.taskNew} fullWidth leadingIcon={<Plus size={18} strokeWidth={2.5} />}>
            {taskCopy.emptyToday.action}
          </Button>
        ) : null
      }
    />
  );
}
