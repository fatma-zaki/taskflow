import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@/app/navigation/routes.js';
import { Button, EmptyState, Page, PageHeader, Spinner } from '@/shared/components';
import { taskCopy } from '../../constants/taskCopy.js';
import { useTask } from '../../hooks/useTask.js';
import { useEditTaskFlow } from '../../hooks/useEditTaskFlow.js';
import TaskFormFields from '../../components/web/TaskFormFields.jsx';

/**
 * Edit a task on the web.
 */
export default function EditTaskPage() {
  const { id = '' } = useParams();
  const { task, isLoading } = useTask(id);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!task) {
    return (
      <Page width="narrow">
        <EmptyState
          title="Task not found"
          description="It may have been deleted."
          action={
            <Button to={ROUTES.tasks} variant="secondary" fullWidth>
              Back to tasks
            </Button>
          }
        />
      </Page>
    );
  }

  return <EditTaskFormPage task={task} />;
}

/**
 * @param {Object} props
 * @param {import('@/shared/types').Task} props.task
 */
function EditTaskFormPage({ task }) {
  const navigate = useNavigate();
  const { values, errors, setField, submit, isSaving, isComplete } = useEditTaskFlow(task);

  return (
    <Page width="narrow">
      <PageHeader
        title="Edit task"
        description={task.title}
        actions={
          <>
            <Button variant="secondary" size="md" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button size="md" onClick={submit} loading={isSaving} disabled={!isComplete}>
              {taskCopy.form.submitSave}
            </Button>
          </>
        }
      />

      <TaskFormFields values={values} errors={errors} setField={setField} />
    </Page>
  );
}
