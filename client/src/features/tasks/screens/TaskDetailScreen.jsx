import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CalendarDays, PenLine, PlayCircle, Trash2, UserRound } from 'lucide-react';
import { ROUTES, routeTo } from '@/app/navigation/routes.js';
import {
  Button,
  Card,
  ConfirmDialog,
  FilePickerRow,
  IconButton,
  OptionPicker,
  Screen,
  ScreenHeader,
  Section,
  Spinner,
} from '@/shared/components';
import { useDisclosure } from '@/shared/hooks';
import { formatFullDate, formatTime } from '@/shared/utils/date.js';
import { populated } from '@/shared/utils/entity.js';
import { SELECTABLE_STATUSES, STATUS_META } from '../constants/taskMeta.js';
import { taskCopy } from '../constants/taskCopy.js';
import { useTaskDetail } from '../hooks/useTaskDetail.js';
import { PriorityBadge, StatusBadge } from '../components/TaskBadges.jsx';
import AttachmentList from '../components/AttachmentList.jsx';

/**
 * Task detail on a phone: the record, its attachments, and the actions the
 * signed-in role is allowed. Behaviour comes from `useTaskDetail`, which the
 * web page shares.
 */
export default function TaskDetailScreen() {
  const { id = '' } = useParams();
  const detail = useTaskDetail(id);
  const { task, attachments, isLoading, error, canEdit, canRemove } = detail;

  const statusPicker = useDisclosure();
  const deleteDialog = useDisclosure();
  const [pendingFile, setPendingFile] = useState(/** @type {File | null} */ (null));

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

  const assignee = populated(task.assignee_id);
  const reporter = populated(task.reporter_id);

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
                <IconButton label="Delete task" onClick={deleteDialog.show} className="text-danger">
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
        <DetailRow
          icon={<PlayCircle size={18} />}
          label="Starts"
          value={`${formatFullDate(task.start_date)} · ${formatTime(task.start_date)}`}
        />
        <DetailRow
          icon={<CalendarDays size={18} />}
          label="Due"
          value={`${formatFullDate(task.end_date)} · ${formatTime(task.end_date)}`}
        />
        <DetailRow icon={<UserRound size={18} />} label="Assigned to" value={assignee?.name ?? 'Unassigned'} />
        <DetailRow icon={<UserRound size={18} />} label="Created by" value={reporter?.name ?? '—'} />
      </Card>

      {canEdit ? (
        <Button variant="secondary" fullWidth className="mt-3" onClick={statusPicker.show}>
          Change status
        </Button>
      ) : null}

      <Section title="Attachments" className="mt-7">
        <AttachmentList
          attachments={attachments}
          onDownload={detail.downloadFile}
          onDelete={canEdit ? detail.removeFile : undefined}
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
                  loading={detail.isUploading}
                  onClick={() => {
                    detail.uploadFile(pendingFile);
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

      <OptionPicker
        open={statusPicker.open}
        onClose={statusPicker.hide}
        title="Status"
        options={SELECTABLE_STATUSES.map((status) => ({ value: status, label: STATUS_META[status].label }))}
        value={task.status}
        onSelect={detail.setStatus}
      />

      <ConfirmDialog
        open={deleteDialog.open}
        onClose={deleteDialog.hide}
        onConfirm={detail.deleteTask}
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
