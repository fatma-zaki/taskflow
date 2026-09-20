import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useCurrentUser } from '@/features/auth';
import { taskCopy } from '../constants/taskCopy.js';
import { canUpdateTask } from '../services/taskRules.js';
import { useToggleTaskStatus } from './useTaskMutations.js';

/**
 * Binds the permission rule to the status mutation, so every task row in the
 * app completes a task the same way and enforces the same check.
 *
 * @returns {{
 *   toggleTask: (task: import('@/shared/types').Task) => void,
 *   canToggle: (task: import('@/shared/types').Task) => boolean,
 *   isToggling: boolean,
 * }}
 */
export function useTaskActions() {
  const { user, isManager } = useCurrentUser();
  const { toggle, isPending } = useToggleTaskStatus();

  const canToggle = useCallback(
    /** @param {import('@/shared/types').Task} task */
    (task) => canUpdateTask(task, { user, isManager }),
    [user, isManager],
  );

  const toggleTask = useCallback(
    /** @param {import('@/shared/types').Task} task */
    (task) => {
      if (!canToggle(task)) {
        toast.error(taskCopy.feedback.notAllowed);
        return;
      }
      toggle(task);
    },
    [canToggle, toggle],
  );

  return { toggleTask, canToggle, isToggling: isPending };
}

export default useTaskActions;
