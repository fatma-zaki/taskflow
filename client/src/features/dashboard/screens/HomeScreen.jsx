import { useMemo } from 'react';
import { Lightbulb } from 'lucide-react';
import { ROUTES } from '@/app/navigation/routes.js';
import { Banner, BrandLogo, Screen, ScreenHeader, Section } from '@/shared/components';
import { useCurrentUser } from '@/features/auth';
import { NotificationBell } from '@/features/activity';
import { NoTasksState, TaskList, TaskListSkeleton } from '@/features/tasks';
import { buildDashboardStats } from '../services/dashboardStats.js';
import { motivationFor } from '../services/greeting.js';
import { useDashboard } from '../hooks/useDashboard.js';
import { useTodayTasks } from '../hooks/useTodayTasks.js';
import GreetingBlock from '../components/GreetingBlock.jsx';
import StatsOverview from '../components/StatsOverview.jsx';

/**
 * Screen 1 — Home. Opens on who you are, what today holds, and one action.
 */
export default function HomeScreen() {
  const { firstName, user } = useCurrentUser();
  const { counts } = useDashboard();
  const { tasks: todayTasks, isLoading } = useTodayTasks();

  const stats = useMemo(() => buildDashboardStats({ counts, tasks: todayTasks }), [counts, todayTasks]);
  const motivation = motivationFor();

  return (
    <Screen
      header={
        <ScreenHeader
          leading={<BrandLogo size="sm" />}
          action={<NotificationBell />}
          align="start"
          transparent
        />
      }
    >
      <GreetingBlock name={firstName || user?.name || 'there'} />

      <StatsOverview stats={stats} className="mt-5" />

      <Banner
        className="mt-4"
        icon={<Lightbulb size={16} />}
        title={motivation.title}
        description={motivation.description}
      />

      <Section title="My tasks" action={{ label: 'View all', to: ROUTES.tasks }} className="mt-7">
        {isLoading ? (
          <TaskListSkeleton />
        ) : todayTasks.length === 0 ? (
          <div className="rounded-card border border-line bg-surface">
            <NoTasksState />
          </div>
        ) : (
          <TaskList tasks={todayTasks} />
        )}
      </Section>
    </Screen>
  );
}
