/**
 * Public surface of the tasks feature. Other features import from here, never
 * from a file inside the feature.
 */
export { default as TaskRow } from './components/TaskRow.jsx';
export { default as TaskList } from './components/TaskList.jsx';
export { default as TaskGroups } from './components/TaskGroups.jsx';
export { default as TaskListSkeleton } from './components/TaskListSkeleton.jsx';
export { default as NoTasksState } from './components/NoTasksState.jsx';
export { default as TaskTable } from './components/web/TaskTable.jsx';
export { StatusBadge, PriorityBadge } from './components/TaskBadges.jsx';

export { useTasks } from './hooks/useTasks.js';
export { useTask } from './hooks/useTask.js';
export { useTaskActions } from './hooks/useTaskActions.js';
export { useTaskFilters } from './hooks/useTaskFilters.js';

export * from './services/taskRules.js';
export * from './services/taskSegments.js';
export {
  TASK_STATUS,
  TASK_PRIORITY,
  STATUS_META,
  PRIORITY_META,
  TASK_FILTERS,
} from './constants/taskMeta.js';
export { taskCopy } from './constants/taskCopy.js';

export { default as TasksScreen } from './screens/TasksScreen.jsx';
export { default as CreateTaskScreen } from './screens/CreateTaskScreen.jsx';
export { default as EditTaskScreen } from './screens/EditTaskScreen.jsx';
export { default as TaskDetailScreen } from './screens/TaskDetailScreen.jsx';

export { default as TasksPage } from './screens/web/TasksPage.jsx';
export { default as CreateTaskPage } from './screens/web/CreateTaskPage.jsx';
export { default as EditTaskPage } from './screens/web/EditTaskPage.jsx';
export { default as TaskDetailPage } from './screens/web/TaskDetailPage.jsx';
