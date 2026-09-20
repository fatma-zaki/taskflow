import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CalendarDays, PenLine, PlayCircle, Trash2, UserRound } from 'lucide-react';
import { ROUTES, routeTo } from '@/app/navigation/routes.js';
import { tasksApi } from '@/services/api';
import {
  Button,
  Card,
  ConfirmSheet,
  FilePickerRow,
  IconButton,
  OptionSheet,
  Screen,
  ScreenHeader,
  Section,
  Spinner,
} from '@/shared/components';
import { useDisclosure } from '@/shared/hooks';
import { formatFullDate, formatTime } from '@/shared/utils/date.js';
import { downloadBlob } from '@/shared/utils/file.js';
import { populated } from '@/shared/utils/entity.js';
import { useCurrentUser } from '@/features/auth';
import { STATUS_META } from '../constants/taskMeta.js';
import { taskCopy } from '../constants/taskCopy.js';
import { canDeleteTask, canUpdateTask } from '../services/taskRules.js';
import { useTask } from '../hooks/useTask.js';
import {
  useDeleteAttachment,
  useDeleteTask,
  useSetTaskStatus,
  useUploadAttachment,
} from '../hooks/useTaskMutations.js';
import { PriorityBadge, StatusBadge } from '../components/TaskBadges.jsx';
import AttachmentList from '../components/AttachmentList.jsx';

/** Statuses a person can move a task to by hand. */
const SELECTABLE_STATUSES = /** @type {const} */ (['upcoming', 'in_progress', 'completed']);

/**
 * Task detail: the full record, its attachments, and the actions allowed for
 * the signed-in role.
 */
export default function TaskDetailScreen() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin, isManager } = useCurrentUser();
  const { task, attachments, isLoading, error } = useTask(id);

  const statusSheet = useDisclosure();
  const deleteSheet = useDisclosure();
  const [pendingFile, setPendingFile] = useState(/** @type {File | null} */ (null));

  const { setStatus } = useSetTaskStatus();
  const { upload, isPending: isUploading } = useUploadAttachment();
  const { removeAttachment } = useDeleteAttachment();
  const { remove } = useDeleteTask({ onDeleted: () => navigate(ROUTES.tasks, { replace: true }) });

  if (isLoading) {
    return (
      <div className="flex min-h-full items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !task) {
    return (
      <Screen header={<ScreenHeader title="Task" showBack backTo={ROUTES.tasks} />}>
        <p className="pt-6 text-bodysm text-ink-muted">
          This task could not be loaded. It may have been deleted.
        </p>
        <Button to={ROUTES.tasks} variant="secondary" className="mt-4">
          Back to tasks
        </Button>
      </Screen>
    );
  }

  const canEdit = canUpdateTask(task, { user, isManager });
  const canRemove = canDeleteTask(task, { user, isAdmin });
  const assignee = populated(task.assignee_id);
  const reporter = populated(task.reporter_id);

  /** @param {import('@/shared/types').Attachment} attachment */
  const handleDownload = async (attachment) => {
    try {
      const blob = await tasksApi.downloadAttachment(task._id, attachment._id);
      downloadBlob(blob, attachment.originalname);
    } catch {
      toast.error(taskCopy.feedback.downloadFailed);
    }
  };

  return (
    <Screen
      header={
        <ScreenHeader
          title="Task"
          showBack
          backTo={ROUTES.tasks}
          action={
            <>
              {canEdit ? (
                <IconButton label="Edit task" to={routeTo.taskEdit(task._id)}>
                  <PenLine size={20} />
                </IconButton>
              ) : null}
              {canRemove ? (
                <IconButton label="Delete task" onClick={deleteSheet.show} className="text-danger">
                  <Trash2 size={20} />
                </IconButton>
              ) : null}
            </>
          }
        />
      }
    >
      <h2 className="pt-2 text-display">{task.title}</h2>

      <div className="mt-3 flex flex-wrap gap-2">
        <StatusBadge status={task.status} />
        <PriorityBadge priority={task.priority} />
      </div>

      {task.description ? (
        <p className="mt-4 whitespace-pre-wrap text-bodysm text-ink-muted">{task.description}</p>
      ) : null}

      <Card padding="none" className="mt-5 divide-y divide-line">
        <DetailRow icon={<PlayCircle size={18} />} label="Starts" value={`${formatFullDate(task.start_date)} · ${formatTime(task.start_date)}`} />
        <DetailRow icon={<CalendarDays size={18} />} label="Due" value={`${formatFullDate(task.end_date)} · ${formatTime(task.end_date)}`} />
        <DetailRow icon={<UserRound size={18} />} label="Assigned to" value={assignee?.name ?? 'Unassigned'} />
        <DetailRow icon={<UserRound size={18} />} label="Created by" value={reporter?.name ?? '—'} />
      </Card>

      {canEdit ? (
        <Button variant="secondary" fullWidth className="mt-3" onClick={statusSheet.show}>
          Change status
        </Button>
      ) : null}

      <Section title="Attachments" className="mt-7">
        <AttachmentList
          attachments={attachments}
          onDownload={handleDownload}
          onDelete={canEdit ? (attachment) => removeAttachment({ taskId: task._id, attachmentId: attachment._id }) : undefined}
        />

        {canEdit ? (
          <Card padding="none" className="mt-3">
            <FilePickerRow
              label={taskCopy.form.attachment}
              file={pendingFile}
              onChange={setPendingFile}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.txt"
            />
            {pendingFile ? (
              <div className="border-t border-line p-3">
                <Button
                  fullWidth
                  size="md"
                  loading={isUploading}
                  onClick={() => {
                    upload({ taskId: task._id, file: pendingFile });
                    setPendingFile(null);
                  }}
                >
                  Upload file
                </Button>
              </div>
            ) : null}
          </Card>
        ) : null}
      </Section>

      <OptionSheet
        open={statusSheet.open}
        onClose={statusSheet.hide}
        title="Status"
        options={SELECTABLE_STATUSES.map((status) => ({ value: status, label: STATUS_META[status].label }))}
        value={task.status}
        onSelect={(status) => setStatus({ id: task._id, status })}
      />

      <ConfirmSheet
        open={deleteSheet.open}
        onClose={deleteSheet.hide}
        onConfirm={() => remove(task._id)}
        title="Delete this task?"
        message="This cannot be undone."
        confirmLabel="Delete task"
      />
    </Screen>
  );
}

/**
 * @param {Object} props
 * @param {import('react').ReactNode} props.icon
 * @param {string} props.label
 * @param {string} props.value
 */
function DetailRow({ icon, label, value }) {
  return (
    <div className="flex min-h-touch items-center gap-3 px-4 py-3">
      <span className="shrink-0 text-ink-faint">{icon}</span>
      <span className="flex-1 text-sub text-ink-muted">{label}</span>
      <span className="max-w-[55%] truncate text-sub font-semibold text-ink">{value}</span>
    </div>
  );
}
