import { useMemo } from 'react';
import { Sun } from 'lucide-react';
import { ROUTES } from '@/app/navigation/routes.js';
import { Banner, EmptyState, Page, PageHeader, Panel, ProgressRing, TextLink } from '@/shared/components';
import { cn } from '@/shared/utils/cn.js';
import { toneFill } from '@/shared/theme/tones.js';
import { TaskList, TaskListSkeleton, isCompleted, isDueToday, isInProgress } from '@/features/tasks';
import { useTodayTasks } from '../../hooks/useTodayTasks.js';

/**
 * My day on the web: today's progress, the breakdown behind it, and the list
 * itself.
 */
export default function MyDayPage() {
  const { tasks, progress, isLoading } = useTodayTasks();

  const breakdown = useMemo(
    () => [
      { id: 'in-progress', label: 'In progress', tone: /** @type {const} */ ('primary'), value: tasks.filter(isInProgress).length },
      {
        id: 'due-today',
        label: 'Due today',
        tone: /** @type {const} */ ('info'),
        value: tasks.filter((task) => isDueToday(task) && !isCompleted(task)).length,
      },
      { id: 'completed', label: 'Completed', tone: /** @type {const} */ ('success'), value: progress.completed },
    ],
    [tasks, progress.completed],
  );

  const allDone = progress.total > 0 && progress.completed === progress.total;

  return (
    <Page>
      <PageHeader title="My day" description="Everything due today, and how far you have got." />

      <div className="grid gap-5 desktop:grid-cols-3">
        <Panel className="desktop:col-span-1">
          <div className="flex flex-col items-center py-2 text-center">
            <ProgressRing value={progress.completed} total={progress.total} size={160} thickness={10}>
              <span className="text-display leading-none">{progress.percent}%</span>
              <span className="mt-1 text-sub text-ink-muted">
                {progress.completed} / {progress.total} done
              </span>
            </ProgressRing>

            <Banner
              className="mt-6 w-full text-left"
              icon={<Sun size={16} />}
              title="Today's focus"
              description={
                allDone ? "Everything's done. Enjoy the rest of your day." : "Keep going! You're doing great."
              }
            />
          </div>

          <dl className="mt-5 divide-y divide-line border-t border-line">
            {breakdown.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-3">
                <span aria-hidden="true" className={cn('h-2.5 w-2.5 rounded-full', toneFill[item.tone])} />
                <dt className="flex-1 text-bodysm text-ink">{item.label}</dt>
                <dd className="text-body font-bold text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Panel>

        <Panel
          className="desktop:col-span-2"
          title="Today's tasks"
          count={tasks.length}
          action={<TextLink to={ROUTES.tasks}>View all tasks</TextLink>}
          padding="none"
        >
          {isLoading ? (
            <div className="p-4">
              <TaskListSkeleton rows={4} />
            </div>
          ) : tasks.length === 0 ? (
            <EmptyState
              title="Nothing due today"
              description="Enjoy your day. You're all caught up."
            />
          ) : (
            <TaskList tasks={tasks} className="rounded-none border-0" />
          )}
        </Panel>
      </div>
    </Page>
  );
}
