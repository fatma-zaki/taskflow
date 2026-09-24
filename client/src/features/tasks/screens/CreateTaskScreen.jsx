import { useNavigate } from 'react-router-dom';
import { Button, Screen, ScreenHeader } from '@/shared/components';
import { taskCopy } from '../constants/taskCopy.js';
import { useCreateTaskFlow } from '../hooks/useCreateTaskFlow.js';
import TaskForm from '../components/TaskForm.jsx';

/**
 * Screen 6 — New task. A focused, full-height form with one primary action
 * pinned above the safe area. The behaviour lives in `useCreateTaskFlow`,
 * which the web page shares.
 */
export default function CreateTaskScreen() {
  const navigate = useNavigate();
  const { values, errors, setField, attachment, setAttachment, submit, isSaving, isComplete } =
    useCreateTaskFlow();

  return (
    <Screen
      header={
        <ScreenHeader
          title="New task"
          leading={
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="press -m-1 min-h-touch px-1 text-bodysm font-semibold text-ink-muted"
            >
              Cancel
            </button>
          }
        />
      }
      footer={
        <Button fullWidth onClick={submit} loading={isSaving} disabled={!isComplete}>
          {taskCopy.form.submitCreate}
        </Button>
      }
    >
      <div className="pt-2">
        <TaskForm
          values={values}
          errors={errors}
          setField={setField}
          attachment={attachment}
          onAttachmentChange={setAttachment}
        />
      </div>
    </Screen>
  );
}
