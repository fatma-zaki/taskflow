import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES, routeTo } from '@/app/navigation/routes.js';
import { Button, Screen, ScreenHeader, Spinner } from '@/shared/components';
import { entityId } from '@/shared/utils/entity.js';
import { useCurrentUser } from '@/features/auth';
import { taskCopy } from '../constants/taskCopy.js';
import { useTask } from '../hooks/useTask.js';
import { useUpdateTask } from '../hooks/useTaskMutations.js';
import { useTaskForm } from '../hooks/useTaskForm.js';
import TaskForm from '../components/TaskForm.jsx';

/**
 * Edit an existing task. Rendered only once the task has loaded, so the form
 * owns its state from a complete set of values.
 */
export default function EditTaskScreen() {
  const { id = '' } = useParams();
  const { task, isLoading } = useTask(id);

  if (isLoading) {
    return (
      <div className="flex min-h-full items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!task) {
    return (
      <Screen header={<ScreenHeader title="Task" showBack backTo={ROUTES.tasks} />}>
        <p className="pt-6 text-bodysm text-ink-muted">This task is no longer available.</p>
      </Screen>
    );
  }

  return <EditTaskForm task={task} />;
}

/**
 * @param {Object} props
 * @param {import('@/shared/types').Task} props.task
 */
function EditTaskForm({ task }) {
  const navigate = useNavigate();
  const { isManager } = useCurrentUser();

  const { save, isPending } = useUpdateTask(task._id, {
    onSaved: () => navigate(routeTo.taskDetail(task._id), { replace: true }),
  });

  const { values, errors, setField, submit, isComplete } = useTaskForm({
    initial: {
      title: task.title,
      description: task.description ?? '',
      start_date: task.start_date,
      end_date: task.end_date,
      priority: task.priority,
      assignee_id: entityId(task.assignee_id) ?? '',
    },
    requireAssignee: isManager,
    onSubmit: save,
  });

  return (
    <Screen
      header={<ScreenHeader title="Edit task" showBack backTo={routeTo.taskDetail(task._id)} />}
      footer={
        <Button fullWidth onClick={submit} loading={isPending} disabled={!isComplete}>
          {taskCopy.form.submitSave}
        </Button>
      }
    >
      <div className="pt-2">
        <TaskForm values={values} errors={errors} setField={setField} showStartDate />
      </div>
    </Screen>
  );
}
