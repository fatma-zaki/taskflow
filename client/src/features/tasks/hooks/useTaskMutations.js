import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { apiErrorMessage, queryKeys, tasksApi } from '@/services/api';
import { taskCopy } from '../constants/taskCopy.js';
import { nextToggledStatus } from '../services/taskRules.js';

/**
 * @typedef {import('@/shared/types').Task} Task
 * @typedef {import('@/shared/types').TaskDraft} TaskDraft
 * @typedef {import('@/shared/types').TaskStatus} TaskStatus
 */

const { feedback } = taskCopy;

/**
 * Everything that writes a task invalidates the same set of queries, so lists,
 * the calendar, the dashboard and the detail screen never drift apart.
 *
 * @returns {() => Promise<void>}
 */
function useInvalidateTaskData() {
  const queryClient = useQueryClient();

  return useCallback(async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all }),
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all }),
    ]);
  }, [queryClient]);
}

/**
 * Toggles a task between completed and in progress.
 *
 * @returns {{ toggle: (task: Task) => void, isPending: boolean }}
 */
export function useToggleTaskStatus() {
  const invalidate = useInvalidateTaskData();

  const mutation = useMutation({
    /** @param {Task} task */
    mutationFn: (task) => tasksApi.updateStatus(task._id, nextToggledStatus(task)),
    onSuccess: invalidate,
    onError: (error) => toast.error(apiErrorMessage(error, feedback.statusFailed)),
  });

  return { toggle: mutation.mutate, isPending: mutation.isPending };
}

/**
 * Sets an explicit status (used by the detail screen's status picker).
 *
 * @returns {{ setStatus: (input: { id: string, status: TaskStatus }) => void, isPending: boolean }}
 */
export function useSetTaskStatus() {
  const invalidate = useInvalidateTaskData();

  const mutation = useMutation({
    /** @param {{ id: string, status: TaskStatus }} input */
    mutationFn: ({ id, status }) => tasksApi.updateStatus(id, status),
    onSuccess: async () => {
      await invalidate();
      toast.success(feedback.statusUpdated);
    },
    onError: (error) => toast.error(apiErrorMessage(error, feedback.statusFailed)),
  });

  return { setStatus: mutation.mutate, isPending: mutation.isPending };
}

/**
 * @param {{ onCreated?: (task: Task) => void }} [options]
 * @returns {{ create: (draft: TaskDraft) => void, isPending: boolean }}
 */
export function useCreateTask(options = {}) {
  const invalidate = useInvalidateTaskData();

  const mutation = useMutation({
    /** @param {TaskDraft} draft */
    mutationFn: (draft) => tasksApi.create(draft),
    onSuccess: async ({ task }) => {
      await invalidate();
      toast.success(feedback.created);
      options.onCreated?.(task);
    },
    onError: (error) => toast.error(apiErrorMessage(error, feedback.createFailed)),
  });

  return { create: mutation.mutate, isPending: mutation.isPending };
}

/**
 * @param {string} id
 * @param {{ onSaved?: () => void }} [options]
 * @returns {{ save: (changes: Partial<TaskDraft>) => void, isPending: boolean }}
 */
export function useUpdateTask(id, options = {}) {
  const invalidate = useInvalidateTaskData();

  const mutation = useMutation({
    /** @param {Partial<TaskDraft>} changes */
    mutationFn: (changes) => tasksApi.update(id, changes),
    onSuccess: async () => {
      await invalidate();
      toast.success(feedback.saved);
      options.onSaved?.();
    },
    onError: (error) => toast.error(apiErrorMessage(error, feedback.saveFailed)),
  });

  return { save: mutation.mutate, isPending: mutation.isPending };
}

/**
 * @param {{ onDeleted?: () => void }} [options]
 * @returns {{ remove: (id: string) => void, isPending: boolean }}
 */
export function useDeleteTask(options = {}) {
  const invalidate = useInvalidateTaskData();

  const mutation = useMutation({
    /** @param {string} id */
    mutationFn: (id) => tasksApi.remove(id),
    onSuccess: async () => {
      await invalidate();
      toast.success(feedback.deleted);
      options.onDeleted?.();
    },
    onError: (error) => toast.error(apiErrorMessage(error, feedback.deleteFailed)),
  });

  return { remove: mutation.mutate, isPending: mutation.isPending };
}

/**
 * Attachment upload. The API accepts files only once a task exists, so the
 * create flow uploads after the task is saved.
 *
 * @returns {{
 *   upload: (input: { taskId: string, file: File }) => void,
 *   uploadAsync: (input: { taskId: string, file: File }) => Promise<unknown>,
 *   isPending: boolean,
 * }}
 */
export function useUploadAttachment() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    /** @param {{ taskId: string, file: File }} input */
    mutationFn: ({ taskId, file }) => tasksApi.uploadAttachment(taskId, file),
    onSuccess: (_result, { taskId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.detail(taskId) });
      toast.success(feedback.attachmentUploaded);
    },
    onError: (error) => toast.error(apiErrorMessage(error, feedback.attachmentFailed)),
  });

  return { upload: mutation.mutate, uploadAsync: mutation.mutateAsync, isPending: mutation.isPending };
}

/**
 * @returns {{ removeAttachment: (input: { taskId: string, attachmentId: string }) => void }}
 */
export function useDeleteAttachment() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    /** @param {{ taskId: string, attachmentId: string }} input */
    mutationFn: ({ taskId, attachmentId }) => tasksApi.removeAttachment(taskId, attachmentId),
    onSuccess: (_result, { taskId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.detail(taskId) });
      toast.success(feedback.attachmentDeleted);
    },
    onError: (error) => toast.error(apiErrorMessage(error, feedback.attachmentFailed)),
  });

  return { removeAttachment: mutation.mutate };
}
