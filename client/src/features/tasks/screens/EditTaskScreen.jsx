import { ROUTES, routeTo } from '@/app/navigation/routes.js';
import { Button, Screen, ScreenHeader, Spinner } from '@/shared/components';
import { useParams } from 'react-router-dom';
import { taskCopy } from '../constants/taskCopy.js';
import { useTask } from '../hooks/useTask.js';
import { useEditTaskFlow } from '../hooks/useEditTaskFlow.js';
import TaskForm from '../components/TaskForm.jsx';

/**
 * Edit an existing task. Rendered only once the task has loaded, so the form
 * starts from a complete set of values.
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

  return <EditTaskFormScreen task={task} />;
}

/**
 * @param {Object} props
 * @param {import('@/shared/types').Task} props.task
 */
function EditTaskFormScreen({ task }) {
  const { values, errors, setField, submit, isSaving, isComplete } = useEditTaskFlow(task);

  return (
    <Screen
      header={<ScreenHeader title="Edit task" showBack backTo={routeTo.taskDetail(task._id)} />}
      footer={
        <Button fullWidth onClick={submit} loading={isSaving} disabled={!isComplete}>
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
