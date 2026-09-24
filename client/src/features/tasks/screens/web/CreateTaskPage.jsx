import { useNavigate } from 'react-router-dom';
import { Button, Page, PageHeader } from '@/shared/components';
import { taskCopy } from '../../constants/taskCopy.js';
import { useCreateTaskFlow } from '../../hooks/useCreateTaskFlow.js';
import TaskFormFields from '../../components/web/TaskFormFields.jsx';

/**
 * New task on the web — the same flow as the phone screen, laid out as a
 * single-column form.
 */
export default function CreateTaskPage() {
  const navigate = useNavigate();
  const { values, errors, setField, attachment, setAttachment, submit, isSaving, isComplete } =
    useCreateTaskFlow();

  return (
    <Page width="narrow">
      <PageHeader
        title="New task"
        description="Describe the work, say when it is due, and assign it."
        actions={
          <>
            <Button variant="secondary" size="md" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button size="md" onClick={submit} loading={isSaving} disabled={!isComplete}>
              {taskCopy.form.submitCreate}
            </Button>
          </>
        }
      />

      <TaskFormFields
        values={values}
        errors={errors}
        setField={setField}
        attachment={attachment}
        onAttachmentChange={setAttachment}
      />
    </Page>
  );
}
