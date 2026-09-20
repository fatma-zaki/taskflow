import { useMemo } from 'react';
import { Sun } from 'lucide-react';
import { ROUTES } from '@/app/navigation/routes.js';
import { Banner, Card, ProgressRing, Screen, ScreenHeader, TextLink } from '@/shared/components';
import { isCompleted, isDueToday, isInProgress } from '@/features/tasks';
import { cn } from '@/shared/utils/cn.js';
import { toneFill } from '@/shared/theme/tones.js';
import { useTodayTasks } from '../hooks/useTodayTasks.js';

/**
 * Screen 5 — My day. One number that answers "how am I doing today?", the
 * breakdown behind it, and a way into the full list.
 */
export default function MyDayScreen() {
  const { tasks, progress } = useTodayTasks();

  const breakdown = useMemo(
    () => [
      { id: 'in-progress', label: 'In progress', tone: /** @type {const} */ ('primary'), value: tasks.filter(isInProgress).length },
      { id: 'due-today', label: 'Due today', tone: /** @type {const} */ ('info'), value: tasks.filter((task) => isDueToday(task) && !isCompleted(task)).length },
      { id: 'completed', label: 'Completed', tone: /** @type {const} */ ('success'), value: progress.completed },
    ],
    [tasks, progress.completed],
  );

  const allDone = progress.total > 0 && progress.completed === progress.total;

  return (
    <Screen header={<ScreenHeader title="My day" showBack backTo={ROUTES.home} />}>
      <Card className="mt-1 flex items-center gap-5" padding="md">
        <ProgressRing value={progress.completed} total={progress.total} size={116} thickness={9}>
          <span className="text-title leading-none">
            {progress.completed} / {progress.total}
          </span>
          <span className="mt-1 text-micro text-ink-muted">tasks completed</span>
        </ProgressRing>

        <div className="flex-1">
          <p className="text-display leading-none">{progress.percent}%</p>
          <p className="mt-2 text-sub text-ink-muted">
            {progress.total === 0 ? 'Nothing due today' : allDone ? 'Day complete' : 'of today done'}
          </p>
        </div>
      </Card>

      <Card padding="none" className="mt-3 divide-y divide-line">
        {breakdown.map((item) => (
          <div key={item.id} className="flex min-h-touch items-center gap-3 px-4 py-3">
            <span aria-hidden="true" className={cn('h-2.5 w-2.5 rounded-full', toneFill[item.tone])} />
            <span className="flex-1 text-bodysm text-ink">{item.label}</span>
            <span className="text-body font-bold text-ink">{item.value}</span>
          </div>
        ))}
      </Card>

      <Banner
        className="mt-4"
        icon={<Sun size={16} />}
        title="Today's focus"
        description={allDone ? "Everything's done. Enjoy the rest of your day." : "Keep going! You're doing great."}
      />

      <div className="mt-6">
        <TextLink to={ROUTES.tasks} emphasis="strong">
          View all tasks
        </TextLink>
      </div>
    </Screen>
  );
}
