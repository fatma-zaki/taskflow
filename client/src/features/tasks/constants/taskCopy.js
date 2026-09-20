/**
 * User-facing copy shared by more than one task component or screen.
 * Keeping it here means a wording change happens once, and gives an i18n layer
 * a single place to hook into later.
 */
export const taskCopy = Object.freeze({
  emptyToday: {
    title: 'No tasks for today',
    description: "Enjoy your day. You're all caught up.",
    action: 'Create your first task',
  },
  emptyFiltered: {
    title: 'Nothing here',
    description: 'No tasks match this filter yet.',
  },
  emptySearch: {
    title: 'No matches',
    description: 'Try a different word or clear the search.',
  },
  groups: {
    overdue: 'Overdue',
    today: 'Today',
    upcoming: 'Upcoming',
    completed: 'Completed',
  },
  feedback: {
    statusUpdated: 'Task updated',
    statusFailed: 'Could not update the task',
    created: 'Task created',
    createFailed: 'Could not create the task',
    saved: 'Changes saved',
    saveFailed: 'Could not save your changes',
    deleted: 'Task deleted',
    deleteFailed: 'Could not delete the task',
    notAllowed: "You don't have permission to update this task",
    attachmentUploaded: 'Attachment added',
    attachmentFailed: 'Could not upload the file',
    attachmentDeleted: 'Attachment removed',
    downloadFailed: 'Could not download the file',
  },
  form: {
    titlePlaceholder: 'Task title…',
    descriptionLabel: 'Description (optional)',
    descriptionPlaceholder: 'Add more details…',
    startDate: 'Starts',
    dueDate: 'Due date',
    dueDatePlaceholder: 'Select date',
    priority: 'Priority',
    assignee: 'Assign to',
    attachment: 'Add attachment',
    submitCreate: 'Create task',
    submitSave: 'Save changes',
  },
});

export default taskCopy;
