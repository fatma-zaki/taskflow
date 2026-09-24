import { useMemo } from 'react';
import { Download, Plus, Search, X } from 'lucide-react';
import { ROUTES } from '@/app/navigation/routes.js';
import {
  Button,
  EmptyState,
  InputField,
  Page,
  PageHeader,
  Panel,
  SelectField,
  Toolbar,
} from '@/shared/components';
import { formatFullDate } from '@/shared/utils/date.js';
import { useCurrentUser } from '@/features/auth';
import { PRIORITY_META, STATUS_META, TASK_PRIORITY, TASK_STATUS } from '../../constants/taskMeta.js';
import { taskCopy } from '../../constants/taskCopy.js';
import { groupTasksByBucket } from '../../services/taskRules.js';
import { useTasks } from '../../hooks/useTasks.js';
import { useTaskFilters } from '../../hooks/useTaskFilters.js';
import { useExportTasks } from '../../hooks/useExportTasks.js';
import NoTasksState from '../../components/NoTasksState.jsx';
import TaskTable from '../../components/web/TaskTable.jsx';

const STATUS_OPTIONS = Object.values(TASK_STATUS).map((status) => ({
  value: status,
  label: STATUS_META[status].label,
}));

const PRIORITY_OPTIONS = Object.values(TASK_PRIORITY).map((priority) => ({
  value: priority,
  label: PRIORITY_META[priority].label,
}));

/** The order groups appear in, with their headings. */
const GROUPS = /** @type {const} */ ([
  { key: 'overdue', label: taskCopy.groups.overdue },
  { key: 'today', label: taskCopy.groups.today },
  { key: 'upcoming', label: taskCopy.groups.upcoming },
  { key: 'completed', label: taskCopy.groups.completed },
]);

/**
 * The web task list: filters across the top, then one table per group.
 * Filtering, grouping and permissions come from the shared task feature.
 */
export default function TasksPage() {
  const { isManager } = useCurrentUser();
  const { tasks, isLoading } = useTasks();
  const { criteria, segment, hasActiveFilters, setSearch, setStatus, setPriority, clearDate, clearAll, apply } =
    useTaskFilters();
  const { exportCsv, isExporting } = useExportTasks();

  const visibleTasks = useMemo(() => apply(tasks), [apply, tasks]);
  const buckets = useMemo(() => groupTasksByBucket(visibleTasks), [visibleTasks]);

  return (
    <Page>
      <PageHeader
        title={segment?.label ?? 'Tasks'}
        description={
          segment
            ? 'A saved view of your task list.'
            : 'Everything assigned to you and the work you created.'
        }
        actions={
          <>
            {isManager ? (
              <Button
                variant="secondary"
                size="md"
                onClick={() => exportCsv({ ...(criteria.status ? { status: criteria.status } : {}) })}
                loading={isExporting}
                leadingIcon={<Download size={17} />}
              >
                Export CSV
              </Button>
            ) : null}
            <Button to={ROUTES.taskNew} size="md" leadingIcon={<Plus size={17} strokeWidth={2.5} />}>
              New task
            </Button>
          </>
        }
      />

      {criteria.date ? (
        <div className="mb-4 flex items-center justify-between gap-4 rounded-card border border-primary/40 bg-primary-tint px-4 py-3">
          <p className="text-sub text-ink">
            Showing tasks due <strong className="font-semibold">{formatFullDate(criteria.date)}</strong>
          </p>
          <button
            type="button"
            onClick={clearDate}
            className="press inline-flex items-center gap-1 text-sub font-semibold text-ink-muted hover:text-ink"
          >
            <X size={14} />
            Clear date
          </button>
        </div>
      ) : null}

      <Toolbar
        action={
          hasActiveFilters ? (
            <Button variant="secondary" size="md" onClick={clearAll}>
              Clear filters
            </Button>
          ) : null
        }
      >
        <InputField
          name="task-search"
          type="search"
          label="Search"
          value={criteria.search ?? ''}
          onChange={setSearch}
          placeholder="Search tasks..."
          leading={<Search size={16} className="text-ink-faint" />}
        />
        <SelectField
          name="task-status"
          label="Status"
          value={criteria.status ?? ''}
          onChange={setStatus}
          options={STATUS_OPTIONS}
          placeholder="All statuses"
        />
        <SelectField
          name="task-priority"
          label="Priority"
          value={criteria.priority ?? ''}
          onChange={setPriority}
          options={PRIORITY_OPTIONS}
          placeholder="All priorities"
        />
      </Toolbar>

      <div className="mt-5 space-y-5">
        {isLoading ? (
          <Panel title="Tasks" padding="none">
            <TaskTable tasks={[]} isLoading />
          </Panel>
        ) : visibleTasks.length === 0 ? (
          <Panel padding="none">
            {tasks.length === 0 ? (
              <NoTasksState />
            ) : (
              <EmptyState
                title={criteria.search ? taskCopy.emptySearch.title : taskCopy.emptyFiltered.title}
                description={
                  criteria.search ? taskCopy.emptySearch.description : taskCopy.emptyFiltered.description
                }
                action={
                  hasActiveFilters ? (
                    <Button variant="secondary" fullWidth onClick={clearAll}>
                      Clear filters
                    </Button>
                  ) : null
                }
              />
            )}
          </Panel>
        ) : (
          GROUPS.map(({ key, label }) => {
            const groupTasks = buckets[key];
            if (groupTasks.length === 0) return null;

            return (
              <Panel key={key} title={label} count={groupTasks.length} padding="none">
                <TaskTable tasks={groupTasks} showPeople={isManager} />
              </Panel>
            );
          })
        )}
      </div>
    </Page>
  );
}
