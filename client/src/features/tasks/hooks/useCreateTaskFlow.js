import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routeTo } from '@/app/navigation/routes.js';
import { entityId } from '@/shared/utils/entity.js';
import { useCurrentUser } from '@/features/auth';
import { useCreateTask, useUploadAttachment } from './useTaskMutations.js';
import { useTaskForm } from './useTaskForm.js';

/**
 * Everything "create a task" does, independent of how it looks: form state,
 * validation, the attachment that can only be uploaded once the task exists,
 * and where to go afterwards.
 *
 * The phone screen and the web page both render this.
 *
 * @returns {{
 *   values: import('@/shared/types').TaskDraft,
 *   errors: Partial<Record<keyof import('@/shared/types').TaskDraft, string | null>>,
 *   setField: <K extends keyof import('@/shared/types').TaskDraft>(field: K, value: import('@/shared/types').TaskDraft[K]) => void,
 *   attachment: File | null,
 *   setAttachment: (file: File | null) => void,
 *   submit: () => void,
 *   isSaving: boolean,
 *   isComplete: boolean,
 * }}
 */
export function useCreateTaskFlow() {
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

  const form = useTaskForm({
    initial: { assignee_id: isManager ? '' : (entityId(user) ?? '') },
    requireAssignee: isManager,
    onSubmit: create,
  });

  return { ...form, attachment, setAttachment, isSaving: isPending };
}

export default useCreateTaskFlow;
