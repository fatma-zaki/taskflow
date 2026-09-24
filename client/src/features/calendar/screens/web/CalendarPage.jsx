import { Plus } from 'lucide-react';
import { ROUTES, routeTo } from '@/app/navigation/routes.js';
import { Button, EmptyState, Page, PageHeader, Panel, TextLink } from '@/shared/components';
import { dayKey, formatDayHeading, formatTime } from '@/shared/utils/date.js';
import { TaskList, TaskListSkeleton } from '@/features/tasks';
import { useCalendarTasks } from '../../hooks/useCalendarTasks.js';
import MonthGrid from '../../components/MonthGrid.jsx';
import MonthNavigator from '../../components/MonthNavigator.jsx';

/**
 * The web calendar: a full month beside the selected day's schedule.
 */
export default function CalendarPage() {
  const { month, selected, tasksByDay, selectedTasks, isLoading, selectDate, shiftBy, goToToday } =
    useCalendarTasks();

  return (
    <Page>
      <PageHeader
        title="Calendar"
        description="See what is due, day by day."
        actions={
          <>
            <Button variant="secondary" size="md" onClick={goToToday}>
              Today
            </Button>
            <Button to={ROUTES.taskNew} size="md" leadingIcon={<Plus size={17} strokeWidth={2.5} />}>
              New task
            </Button>
          </>
        }
      />

      <div className="grid gap-5 desktop:grid-cols-3">
        <Panel className="desktop:col-span-2">
          <MonthNavigator month={month} onShift={shiftBy} />
          <MonthGrid
            className="mt-4"
            month={month}
            selected={selected}
            tasksByDay={tasksByDay}
            onSelect={selectDate}
            size="lg"
          />
        </Panel>

        <Panel
          title={formatDayHeading(selected)}
          count={selectedTasks.length || undefined}
          action={
            selectedTasks.length > 0 ? (
              <TextLink to={routeTo.tasksOnDate(dayKey(selected))}>Open in tasks</TextLink>
            ) : null
          }
          padding="none"
        >
          {isLoading ? (
            <div className="p-4">
              <TaskListSkeleton />
            </div>
          ) : selectedTasks.length === 0 ? (
            <EmptyState
              size="compact"
              title="Nothing scheduled"
              description="This day is free. Pick another date or add a task."
              action={
                <Button to={ROUTES.taskNew} variant="secondary" fullWidth>
                  Add a task
                </Button>
              }
            />
          ) : (
            <TaskList
              tasks={selectedTasks}
              subtitleFor={(task) => formatTime(task.end_date)}
              className="rounded-none border-0"
            />
          )}
        </Panel>
      </div>
    </Page>
  );
}
