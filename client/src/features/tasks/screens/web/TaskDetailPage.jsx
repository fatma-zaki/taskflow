import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, PenLine, Trash2, Upload } from 'lucide-react';
import { ROUTES, routeTo } from '@/app/navigation/routes.js';
import {
  Avatar,
  Button,
  ConfirmDialog,
  EmptyState,
  FilePickerRow,
  Page,
  PageHeader,
  Panel,
  SelectField,
  Spinner,
} from '@/shared/components';
import { useDisclosure } from '@/shared/hooks';
import { formatFullDate, formatTime } from '@/shared/utils/date.js';
import { populated } from '@/shared/utils/entity.js';
import { SELECTABLE_STATUSES, STATUS_META } from '../../constants/taskMeta.js';
import { taskCopy } from '../../constants/taskCopy.js';
import { useTaskDetail } from '../../hooks/useTaskDetail.js';
import { PriorityBadge, StatusBadge } from '../../components/TaskBadges.jsx';
import AttachmentList from '../../components/AttachmentList.jsx';

/**
 * Task detail on the web: the description and files on the left, the record's
 * facts and status control on the right.
 */
export default function TaskDetailPage() {
  const { id = '' } = useParams();
  const detail = useTaskDetail(id);
  const { task, attachments, isLoading, error, canEdit, canRemove } = detail;

  const deleteDialog = useDisclosure();
  const [pendingFile, setPendingFile] = useState(/** @type {File | null} */ (null));

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !task) {
    return (
      <Page width="narrow">
        <EmptyState
          title="Task not found"
          description="This task could not be loaded. It may have been deleted."
          action={
            <Button to={ROUTES.tasks} variant="secondary" fullWidth>
              Back to tasks
            </Button>
          }
        />
      </Page>
    );
  }

  const assignee = populated(task.assignee_id);
  const reporter = populated(task.reporter_id);

  return (
    <Page>
      <Link
        to={ROUTES.tasks}
        className="mb-5 inline-flex items-center gap-1.5 text-sub font-semibold text-ink-muted transition-colors hover:text-ink"
      >
        <ArrowLeft size={15} />
        All tasks
      </Link>

      <PageHeader
        title={task.title}
        actions={
          <>
            {canEdit ? (
              <Button
                to={routeTo.taskEdit(task._id)}
                variant="secondary"
                size="md"
                leadingIcon={<PenLine size={16} />}
              >
                Edit
              </Button>
            ) : null}
            {canRemove ? (
              <Button
                variant="danger"
                size="md"
                onClick={deleteDialog.show}
                leadingIcon={<Trash2 size={16} />}
              >
                Delete
              </Button>
            ) : null}
          </>
        }
      />

      <div className="grid gap-5 desktop:grid-cols-3">
        <div className="space-y-5 desktop:col-span-2">
          <Panel title="Description">
            {task.description ? (
              <p className="whitespace-pre-wrap text-bodysm text-ink">{task.description}</p>
            ) : (
              <p className="text-bodysm text-ink-faint">No description was added.</p>
            )}
          </Panel>

          <Panel title="Attachments" count={attachments.length}>
            <AttachmentList
              attachments={attachments}
              onDownload={detail.downloadFile}
              onDelete={canEdit ? detail.removeFile : undefined}
            />

            {canEdit ? (
              <div className="mt-4 rounded-card border border-line">
                <FilePickerRow
                  label={taskCopy.form.attachment}
                  file={pendingFile}
                  onChange={setPendingFile}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.txt"
                />
                {pendingFile ? (
                  <div className="border-t border-line p-3">
                    <Button
                      size="md"
                      loading={detail.isUploading}
                      leadingIcon={<Upload size={16} />}
                      onClick={() => {
                        detail.uploadFile(pendingFile);
                        setPendingFile(null);
                      }}
                    >
                      Upload file
                    </Button>
                  </div>
                ) : null}
              </div>
            ) : null}
          </Panel>
        </div>

        <div className="space-y-5">
          <Panel title="Status">
            <div className="flex flex-wrap gap-2">
              <StatusBadge status={task.status} />
              <PriorityBadge priority={task.priority} />
            </div>

            {canEdit ? (
              <SelectField
                className="mt-4"
                name="task-status"
                label="Change status"
                value={task.status}
                onChange={(value) =>
                  detail.setStatus(/** @type {import('@/shared/types').TaskStatus} */ (value))
                }
                options={SELECTABLE_STATUSES.map((status) => ({
                  value: status,
                  label: STATUS_META[status].label,
                }))}
              />
            ) : null}
          </Panel>

          <Panel title="Details" padding="none">
            <dl className="divide-y divide-line">
              <FactRow
                label="Starts"
                value={`${formatFullDate(task.start_date)} · ${formatTime(task.start_date)}`}
              />
              <FactRow
                label="Due"
                value={`${formatFullDate(task.end_date)} · ${formatTime(task.end_date)}`}
              />
              <PersonRow label="Assigned to" user={assignee} fallback="Unassigned" />
              <PersonRow label="Created by" user={reporter} fallback="—" />
            </dl>
          </Panel>
        </div>
      </div>

      <ConfirmDialog
        open={deleteDialog.open}
        onClose={deleteDialog.hide}
        onConfirm={detail.deleteTask}
        title="Delete this task?"
        message="This cannot be undone."
        confirmLabel="Delete task"
      />
    </Page>
  );
}

/**
 * @param {Object} props
 * @param {string} props.label
 * @param {string} props.value
 */
function FactRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3.5">
      <dt className="text-sub text-ink-muted">{label}</dt>
      <dd className="truncate text-sub font-semibold text-ink">{value}</dd>
    </div>
  );
}

/**
 * @param {Object} props
 * @param {string} props.label
 * @param {import('@/shared/types').User | undefined} props.user
 * @param {string} props.fallback
 */
function PersonRow({ label, user, fallback }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3.5">
      <dt className="text-sub text-ink-muted">{label}</dt>
      <dd className="flex min-w-0 items-center gap-2">
        {user ? <Avatar name={user.name} size="sm" /> : null}
        <span className="truncate text-sub font-semibold text-ink">{user?.name ?? fallback}</span>
      </dd>
    </div>
  );
}
