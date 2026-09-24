import { CalendarCheck, ListChecks, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES, routeTo } from '@/app/navigation/routes.js';
import {
  Card,
  Dialog,
  IconButton,
  ListRow,
  Screen,
  ScreenHeader,
  Section,
} from '@/shared/components';
import { useDisclosure } from '@/shared/hooks';
import { dayKey, formatDayHeading, formatTime } from '@/shared/utils/date.js';
import { NoTasksState, TaskList, TaskListSkeleton } from '@/features/tasks';
import { useCalendarTasks } from '../hooks/useCalendarTasks.js';
import MonthGrid from '../components/MonthGrid.jsx';
import MonthNavigator from '../components/MonthNavigator.jsx';

/**
 * Screen 2 — Calendar. A month at a glance, then the selected day's timeline.
 */
export default function CalendarScreen() {
  const navigate = useNavigate();
  const menu = useDisclosure();
  const { month, selected, tasksByDay, selectedTasks, isLoading, selectDate, shiftBy, goToToday } =
    useCalendarTasks();

  return (
    <Screen
      header={
        <ScreenHeader
          title="Calendar"
          showBack
          backTo={ROUTES.home}
          action={
            <IconButton label="Calendar options" onClick={menu.show}>
              <MoreHorizontal size={22} />
            </IconButton>
          }
        />
      }
    >
      <div className="mt-1">
        <MonthNavigator month={month} onShift={shiftBy} />
      </div>

      <Card padding="sm" className="mt-3">
        <MonthGrid month={month} selected={selected} tasksByDay={tasksByDay} onSelect={selectDate} />
      </Card>

      <Section
        title={formatDayHeading(selected)}
        count={selectedTasks.length || undefined}
        className="mt-6"
      >
        {isLoading ? (
          <TaskListSkeleton />
        ) : selectedTasks.length === 0 ? (
          <div className="rounded-card border border-line bg-surface">
            <NoTasksState
              title="Nothing scheduled"
              description="This day is free. Pick another date or add a task."
              size="compact"
            />
          </div>
        ) : (
          <TaskList tasks={selectedTasks} subtitleFor={(task) => formatTime(task.end_date)} />
        )}
      </Section>

      <Dialog open={menu.open} onClose={menu.hide} title="Calendar">
        <div className="px-2 pt-2">
          <ListRow
            label="Jump to today"
            leading={<CalendarCheck size={18} className="text-ink-muted" />}
            chevron={false}
            onClick={() => {
              goToToday();
              menu.hide();
            }}
          />
          <ListRow
            label="Open this day in tasks"
            leading={<ListChecks size={18} className="text-ink-muted" />}
            chevron={false}
            onClick={() => {
              menu.hide();
              navigate(routeTo.tasksOnDate(dayKey(selected)));
            }}
          />
        </div>
      </Dialog>
    </Screen>
  );
}
