import { useNavigate } from 'react-router-dom';
import { routeTo } from '@/app/navigation/routes.js';
import { entityId } from '@/shared/utils/entity.js';
import { useCurrentUser } from '@/features/auth';
import { useUpdateTask } from './useTaskMutations.js';
import { useTaskForm } from './useTaskForm.js';

/**
 * "Edit a task", independent of presentation: the form seeded from the task,
 * validation, saving, and returning to the task afterwards.
 *
 * @param {import('@/shared/types').Task} task
 * @returns {{
 *   values: import('@/shared/types').TaskDraft,
 *   errors: Partial<Record<keyof import('@/shared/types').TaskDraft, string | null>>,
 *   setField: <K extends keyof import('@/shared/types').TaskDraft>(field: K, value: import('@/shared/types').TaskDraft[K]) => void,
 *   submit: () => void,
 *   isSaving: boolean,
 *   isComplete: boolean,
 * }}
 */
export function useEditTaskFlow(task) {
  const navigate = useNavigate();
  const { isManager } = useCurrentUser();

  const { save, isPending } = useUpdateTask(task._id, {
    onSaved: () => navigate(routeTo.taskDetail(task._id), { replace: true }),
  });

  const form = useTaskForm({
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

  return { ...form, isSaving: isPending };
}

export default useEditTaskFlow;
