import { CalendarDays, Flag, PlayCircle, Type, UserRound } from 'lucide-react';
import {
  Card,
  DateTimeRow,
  FilePickerRow,
  FormRow,
  OptionPicker,
  TextAreaField,
  TextField,
} from '@/shared/components';
import { useDisclosure } from '@/shared/hooks';
import { entityId } from '@/shared/utils/entity.js';
import { useCurrentUser } from '@/features/auth';
import { useUsers } from '@/features/users';
import { PRIORITY_META, PRIORITY_OPTIONS } from '../constants/taskMeta.js';
import { taskCopy } from '../constants/taskCopy.js';

const { form } = taskCopy;

/**
 * The task form body, shared by the create and edit screens: large touch rows,
 * native pickers, no desktop-style label/input pairs.
 *
 * @param {Object} props
 * @param {import('@/shared/types').TaskDraft} props.values
 * @param {Partial<Record<keyof import('@/shared/types').TaskDraft, string | null>>} props.errors
 * @param {<K extends keyof import('@/shared/types').TaskDraft>(field: K, value: import('@/shared/types').TaskDraft[K]) => void} props.setField
 * @param {boolean} [props.showStartDate]
 * @param {File | null} [props.attachment]
 * @param {(file: File | null) => void} [props.onAttachmentChange]
 */
export default function TaskForm({
  values,
  errors,
  setField,
  showStartDate = false,
  attachment,
  onAttachmentChange,
}) {
  const { user, isManager } = useCurrentUser();
  const priorityPicker = useDisclosure();
  const assigneePicker = useDisclosure();

  const { users } = useUsers({ role: 'user' }, { enabled: isManager });

  /** Managers assign work; everyone else owns what they create. */
  const assigneeOptions = isManager
    ? [
        ...(user ? [{ value: entityId(user) ?? '', label: `${user.name} (Me)` }] : []),
        ...users
          .filter((candidate) => entityId(candidate) !== entityId(user))
          .map((candidate) => ({ value: entityId(candidate) ?? '', label: candidate.name, description: candidate.email })),
      ]
    : [];

  const selectedAssignee = assigneeOptions.find((option) => option.value === values.assignee_id);

  return (
    <div className="space-y-3">
      <Card padding="none">
        <TextField
          name="title"
          value={values.title}
          onChange={(value) => setField('title', value)}
          placeholder={form.titlePlaceholder}
          label="Task title"
          error={errors.title}
          leading={<Type size={18} className="text-ink-faint" />}
          autoFocus
        />
      </Card>

      <Card padding="none">
        <p className="px-4 pt-3 text-sub font-semibold text-ink-muted">{form.descriptionLabel}</p>
        <TextAreaField
          name="description"
          value={values.description}
          onChange={(value) => setField('description', value)}
          placeholder={form.descriptionPlaceholder}
          label="Description"
        />
      </Card>

      <Card padding="none" className="divide-y divide-line">
        {showStartDate ? (
          <DateTimeRow
            label={form.startDate}
            value={values.start_date}
            onChange={(value) => setField('start_date', value)}
            icon={<PlayCircle size={18} />}
          />
        ) : null}

        <DateTimeRow
          label={form.dueDate}
          value={values.end_date}
          onChange={(value) => setField('end_date', value)}
          placeholder={form.dueDatePlaceholder}
          icon={<CalendarDays size={18} />}
          error={errors.end_date}
          min={values.start_date}
        />

        <FormRow
          label={form.priority}
          value={PRIORITY_META[values.priority].label}
          icon={<Flag size={18} />}
          onClick={priorityPicker.show}
        />

        {isManager ? (
          <FormRow
            label={form.assignee}
            value={selectedAssignee?.label}
            icon={<UserRound size={18} />}
            onClick={assigneePicker.show}
            error={errors.assignee_id}
          />
        ) : null}

        {onAttachmentChange ? (
          <FilePickerRow
            label={form.attachment}
            file={attachment ?? null}
            onChange={onAttachmentChange}
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.txt"
          />
        ) : null}
      </Card>

      <OptionPicker
        open={priorityPicker.open}
        onClose={priorityPicker.hide}
        title={form.priority}
        options={[...PRIORITY_OPTIONS]}
        value={values.priority}
        onSelect={(value) => setField('priority', value)}
      />

      <OptionPicker
        open={assigneePicker.open}
        onClose={assigneePicker.hide}
        title={form.assignee}
        options={assigneeOptions}
        value={values.assignee_id}
        onSelect={(value) => setField('assignee_id', value)}
      />
    </div>
  );
}
