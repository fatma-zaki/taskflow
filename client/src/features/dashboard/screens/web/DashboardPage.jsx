import { useMemo } from 'react';
import { Plus } from 'lucide-react';
import { ROUTES } from '@/app/navigation/routes.js';
import { Button, EmptyState, Page, PageHeader, Panel, ProgressRing, TextLink } from '@/shared/components';
import { useCurrentUser } from '@/features/auth';
import { ActivityList, useActivity } from '@/features/activity';
import { CategoryList, useTaskSegments } from '@/features/categories';
import { NoTasksState, TaskList, TaskListSkeleton, groupTasksByBucket, useTasks } from '@/features/tasks';
import { buildDashboardStats } from '../../services/dashboardStats.js';
import { greetingFor } from '../../services/greeting.js';
import { useDashboard } from '../../hooks/useDashboard.js';
import { useTodayTasks } from '../../hooks/useTodayTasks.js';
import StatCard from '../../components/StatCard.jsx';

const UPCOMING_PREVIEW = 6;

/**
 * The web dashboard: the day's numbers, what is due now, and what is coming —
 * built from the same hooks and rules as the phone's Home screen.
 */
export default function DashboardPage() {
  const { firstName, user } = useCurrentUser();
  const { counts } = useDashboard();
  const { tasks: todayTasks, progress, isLoading } = useTodayTasks();
  const { tasks: allTasks } = useTasks();
  const { segments, isLoading: segmentsLoading } = useTaskSegments();
  const { items: activity } = useActivity({ limit: 5 });

  const stats = useMemo(() => buildDashboardStats({ counts, tasks: todayTasks }), [counts, todayTasks]);
  const upcoming = useMemo(
    () => groupTasksByBucket(allTasks).upcoming.slice(0, UPCOMING_PREVIEW),
    [allTasks],
  );

  return (
    <Page>
      <PageHeader
        title={`${greetingFor()}, ${firstName || user?.name || 'there'}`}
        description="Here's what's happening with your tasks today."
        actions={
          <Button to={ROUTES.taskNew} size="md" leadingIcon={<Plus size={17} strokeWidth={2.5} />}>
            New task
          </Button>
        }
      />

      <div className="grid gap-5 desktop:grid-cols-3">
        <div className="space-y-5 desktop:col-span-2">
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <StatCard
                  key={stat.id}
                  label={stat.label}
                  value={stat.value}
                  tone={stat.tone}
                  icon={<Icon />}
                  to={stat.to}
                />
              );
            })}
          </div>

          <Panel
            title="Due today"
            count={todayTasks.length}
            action={<TextLink to={ROUTES.tasks}>View all</TextLink>}
            padding="none"
          >
            {isLoading ? (
              <div className="p-4">
                <TaskListSkeleton />
              </div>
            ) : todayTasks.length === 0 ? (
              <NoTasksState />
            ) : (
              <TaskList tasks={todayTasks} className="rounded-none border-0" />
            )}
          </Panel>

          <Panel title="Upcoming" count={upcoming.length} padding="none">
            {upcoming.length === 0 ? (
              <EmptyState
                size="compact"
                title="Nothing scheduled"
                description="Tasks with a future due date will appear here."
              />
            ) : (
              <TaskList tasks={upcoming} className="rounded-none border-0" />
            )}
          </Panel>
        </div>

        <div className="space-y-5">
          <Panel title="My day">
            <div className="flex items-center gap-5">
              <ProgressRing value={progress.completed} total={progress.total} size={104} thickness={8}>
                <span className="text-section leading-none">{progress.percent}%</span>
              </ProgressRing>
              <div className="min-w-0">
                <p className="text-body font-semibold text-ink">
                  {progress.completed} of {progress.total} done
                </p>
                <p className="mt-1 text-sub text-ink-muted">
                  {progress.total === 0
                    ? 'Nothing due today.'
                    : progress.completed === progress.total
                      ? 'Everything is finished.'
                      : 'Keep going, you’re on track.'}
                </p>
                <TextLink to={ROUTES.myDay} className="mt-3">
                  Open my day
                </TextLink>
              </div>
            </div>
          </Panel>

          <Panel title="Categories" padding="sm">
            <CategoryList segments={segments} isLoading={segmentsLoading} compact />
          </Panel>

          <Panel
            title="Recent activity"
            action={<TextLink to={ROUTES.activity}>View all</TextLink>}
            padding="none"
          >
            {activity.length === 0 ? (
              <EmptyState size="compact" title="Nothing yet" description="Updates will show up here." />
            ) : (
              <ActivityList items={activity} className="rounded-none border-0" />
            )}
          </Panel>
        </div>
      </div>
    </Page>
  );
}
