import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ROUTES } from '@/app/navigation/routes.js';
import { blobApiErrorMessage, tasksApi } from '@/services/api';
import { downloadBlob } from '@/shared/utils/file.js';
import { useCurrentUser } from '@/features/auth';
import { taskCopy } from '../constants/taskCopy.js';
import { canDeleteTask, canUpdateTask } from '../services/taskRules.js';
import { useTask } from './useTask.js';
import {
  useDeleteAttachment,
  useDeleteTask,
  useSetTaskStatus,
  useUploadAttachment,
} from './useTaskMutations.js';

/**
 * Everything the task detail view needs: the task, its attachments, what this
 * person may do with it, and the actions themselves.
 *
 * Both the phone screen and the web page render this — the rules and the
 * wiring exist once.
 *
 * @param {string} id
 * @returns {{
 *   task: import('@/shared/types').Task | undefined,
 *   attachments: import('@/shared/types').Attachment[],
 *   isLoading: boolean,
 *   error: unknown,
 *   canEdit: boolean,
 *   canRemove: boolean,
 *   isUploading: boolean,
 *   setStatus: (status: import('@/shared/types').TaskStatus) => void,
 *   uploadFile: (file: File) => void,
 *   removeFile: (attachment: import('@/shared/types').Attachment) => void,
 *   downloadFile: (attachment: import('@/shared/types').Attachment) => Promise<void>,
 *   deleteTask: () => void,
 * }}
 */
export function useTaskDetail(id) {
  const navigate = useNavigate();
  const { user, isAdmin, isManager } = useCurrentUser();
  const { task, attachments, isLoading, error } = useTask(id);

  const { setStatus } = useSetTaskStatus();
  const { upload, isPending: isUploading } = useUploadAttachment();
  const { removeAttachment } = useDeleteAttachment();
  const { remove } = useDeleteTask({ onDeleted: () => navigate(ROUTES.tasks, { replace: true }) });

  return {
    task,
    attachments,
    isLoading,
    error,
    canEdit: task ? canUpdateTask(task, { user, isManager }) : false,
    canRemove: task ? canDeleteTask(task, { user, isAdmin }) : false,
    isUploading,
    setStatus: (status) => setStatus({ id, status }),
    uploadFile: (file) => upload({ taskId: id, file }),
    removeFile: (attachment) => removeAttachment({ taskId: id, attachmentId: attachment._id }),
    downloadFile: async (attachment) => {
      try {
        const blob = await tasksApi.downloadAttachment(id, attachment._id);
        downloadBlob(blob, attachment.originalname);
      } catch (error) {
        toast.error(await blobApiErrorMessage(error, taskCopy.feedback.downloadFailed));
      }
    },
    deleteTask: () => remove(id),
  };
}

export default useTaskDetail;
