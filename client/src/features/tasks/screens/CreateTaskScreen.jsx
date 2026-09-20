import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routeTo } from '@/app/navigation/routes.js';
import { Button, Screen, ScreenHeader } from '@/shared/components';
import { entityId } from '@/shared/utils/entity.js';
import { useCurrentUser } from '@/features/auth';
import { taskCopy } from '../constants/taskCopy.js';
import { useCreateTask, useUploadAttachment } from '../hooks/useTaskMutations.js';
import { useTaskForm } from '../hooks/useTaskForm.js';
import TaskForm from '../components/TaskForm.jsx';

/**
 * Screen 6 — New task. A focused, full-height form with one primary action
 * pinned above the keyboard-safe area.
 *
 * The task starts now unless a due date says otherwise, and any attachment is
 * uploaded once the task exists (the API accepts files only against a saved task).
 */
export default function CreateTaskScreen() {
  const navigate = useNavigate();
  const { user, isManager } = useCurrentUser();
  const [attachment, setAttachment] = useState(/** @type {File | null} */ (null));

  const { uploadAsync } = useUploadAttachment();

  const { create, isPending } = useCreateTask({
    onCreated: async (task) => {
      if (attachment) {
        await uploadAsync({ taskId: task._id, file: attachment }).catch(() => undefined);
      }
      navigate(routeTo.taskDetail(task._id), { replace: true });
    },
  });

  const { values, errors, setField, submit, isComplete } = useTaskForm({
    initial: { assignee_id: isManager ? '' : (entityId(user) ?? '') },
    requireAssignee: isManager,
    onSubmit: create,
  });

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
        <Button fullWidth onClick={submit} loading={isPending} disabled={!isComplete}>
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
