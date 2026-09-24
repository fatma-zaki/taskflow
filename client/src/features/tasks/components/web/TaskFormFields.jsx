import {
  DateTimeField,
  FilePickerRow,
  InputField,
  Panel,
  SelectField,
  TextAreaInput,
} from '@/shared/components';
import { entityId } from '@/shared/utils/entity.js';
import { useCurrentUser } from '@/features/auth';
import { useUsers } from '@/features/users';
import { PRIORITY_OPTIONS } from '../../constants/taskMeta.js';
import { taskCopy } from '../../constants/taskCopy.js';

const { form } = taskCopy;

/**
 * The web task form body. Same state and validation as the phone form
 * (`useTaskForm`), presented as labelled fields on a wide canvas.
 *
 * @param {Object} props
 * @param {import('@/shared/types').TaskDraft} props.values
 * @param {Partial<Record<keyof import('@/shared/types').TaskDraft, string | null>>} props.errors
 * @param {<K extends keyof import('@/shared/types').TaskDraft>(field: K, value: import('@/shared/types').TaskDraft[K]) => void} props.setField
 * @param {File | null} [props.attachment]
 * @param {(file: File | null) => void} [props.onAttachmentChange]
 */
export default function TaskFormFields({ values, errors, setField, attachment, onAttachmentChange }) {
  const { user, isManager } = useCurrentUser();
  const { users } = useUsers({ role: 'user' }, { enabled: isManager });

  const assigneeOptions = isManager
    ? [
        ...(user ? [{ value: entityId(user) ?? '', label: `${user.name} (Me)` }] : []),
        ...users
          .filter((candidate) => entityId(candidate) !== entityId(user))
          .map((candidate) => ({ value: entityId(candidate) ?? '', label: candidate.name })),
      ]
    : [];

  return (
    <div className="space-y-5">
      <Panel title="Details">
        <div className="space-y-5">
          <InputField
            name="title"
            label="Task title"
            value={values.title}
            onChange={(value) => setField('title', value)}
            placeholder="What needs to be done?"
            error={errors.title}
          />
          <TextAreaInput
            name="description"
            label={form.descriptionLabel}
            value={values.description}
            onChange={(value) => setField('description', value)}
            placeholder={form.descriptionPlaceholder}
          />
        </div>
      </Panel>

      <Panel title="Schedule">
        <div className="grid gap-5 sm:grid-cols-2">
          <DateTimeField
            name="start_date"
            label={form.startDate}
            value={values.start_date}
            onChange={(value) => setField('start_date', value)}
          />
          <DateTimeField
            name="end_date"
            label={form.dueDate}
            value={values.end_date}
            onChange={(value) => setField('end_date', value)}
            error={errors.end_date}
            min={values.start_date}
          />
        </div>
      </Panel>

      <Panel title="Assignment">
        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField
            name="priority"
            label={form.priority}
            value={values.priority}
            onChange={(value) =>
              setField('priority', /** @type {import('@/shared/types').TaskPriority} */ (value))
            }
            options={[...PRIORITY_OPTIONS]}
          />
          {isManager ? (
            <SelectField
              name="assignee_id"
              label={form.assignee}
              value={values.assignee_id}
              onChange={(value) => setField('assignee_id', value)}
              options={assigneeOptions}
              placeholder="Select a person"
              error={errors.assignee_id}
            />
          ) : null}
        </div>

        {onAttachmentChange ? (
          <div className="mt-5 rounded-card border border-line">
            <FilePickerRow
              label={form.attachment}
              file={attachment ?? null}
              onChange={onAttachmentChange}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.txt"
            />
          </div>
        ) : null}
      </Panel>
    </div>
  );
}
