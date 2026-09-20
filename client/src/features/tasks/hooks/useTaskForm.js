import { useCallback, useMemo, useState } from 'react';
import { isValid, validateEndDate, validateRequired, validateTitle } from '@/shared/utils/validation.js';

/**
 * @typedef {import('@/shared/types').TaskDraft} TaskDraft
 * @typedef {Record<keyof TaskDraft, string | null>} TaskFormErrors
 */

/**
 * Form state and validation for creating and editing a task.
 *
 * The rules live here rather than in the screen, so both task forms behave
 * identically and the validation can be tested without rendering anything.
 *
 * @param {Object} options
 * @param {Partial<TaskDraft>} [options.initial]
 * @param {boolean} options.requireAssignee Managers must pick who does the work.
 * @param {(draft: TaskDraft) => void} options.onSubmit
 * @returns {{
 *   values: TaskDraft,
 *   errors: Partial<TaskFormErrors>,
 *   setField: <K extends keyof TaskDraft>(field: K, value: TaskDraft[K]) => void,
 *   submit: () => void,
 *   isComplete: boolean,
 * }}
 */
export function useTaskForm({ initial, requireAssignee, onSubmit }) {
  const [values, setValues] = useState(() => ({
    title: '',
    description: '',
    start_date: new Date().toISOString(),
    end_date: '',
    priority: /** @type {import('@/shared/types').TaskPriority} */ ('medium'),
    assignee_id: '',
    ...initial,
  }));
  const [errors, setErrors] = useState(/** @type {Partial<TaskFormErrors>} */ ({}));

  const setField = useCallback((field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: null }));
  }, []);

  const validateAll = useCallback(() => {
    /** @type {Partial<TaskFormErrors>} */
    const next = {
      title: validateTitle(values.title),
      end_date: validateEndDate(values.end_date, values.start_date),
      assignee_id: requireAssignee ? validateRequired(values.assignee_id, 'Assignee') : null,
    };
    setErrors(next);
    return isValid(next);
  }, [values, requireAssignee]);

  const submit = useCallback(() => {
    if (validateAll()) onSubmit(values);
  }, [validateAll, onSubmit, values]);

  /** Enables the primary button without nagging the user mid-typing. */
  const isComplete = useMemo(
    () => Boolean(values.title.trim() && values.end_date && (!requireAssignee || values.assignee_id)),
    [values, requireAssignee],
  );

  return { values, errors, setField, submit, isComplete };
}

export default useTaskForm;
