import { Dialog, EmptyState, Spinner } from '@/shared/components';
import { TaskTable, useTasks } from '@/features/tasks';

/**
 * Everything assigned to one person, without leaving the team list.
 *
 * @param {Object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {string | null} props.userId
 * @param {string} [props.userName]
 */
export default function UserTasksDialog({ open, onClose, userId, userName }) {
  const { tasks, isLoading } = useTasks(
    { assignee_id: userId ?? undefined },
    { enabled: open && Boolean(userId) },
  );

  return (
    <Dialog open={open} onClose={onClose} title={userName ? `Tasks for ${userName}` : 'Tasks'} size="xl">
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="-mx-6 -my-5">
          <TaskTable
            tasks={tasks}
            showPeople={false}
            empty={
              <EmptyState
                size="compact"
                title="No tasks"
                description="This person has nothing assigned right now."
              />
            }
          />
        </div>
      )}
    </Dialog>
  );
}
