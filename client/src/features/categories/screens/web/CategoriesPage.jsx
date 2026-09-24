import { Link } from 'react-router-dom';
import { routeTo } from '@/app/navigation/routes.js';
import { IconBadge, Page, PageHeader, Skeleton, SproutIllustration } from '@/shared/components';
import { useTaskSegments } from '../../hooks/useTaskSegments.js';

/**
 * Categories on the web: the same saved views as the phone screen, laid out as
 * a card grid that suits a wide viewport.
 */
export default function CategoriesPage() {
  const { segments, isLoading } = useTaskSegments();

  return (
    <Page>
      <PageHeader title="Categories" description="Saved views into your task list." />

      <div className="grid gap-4 sm:grid-cols-2 desktop:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key -- placeholders have no identity
              <Skeleton key={index} className="h-36 rounded-card" />
            ))
          : segments.map(({ segment, count }) => {
              const Icon = segment.icon;

              return (
                <Link
                  key={segment.id}
                  to={routeTo.tasksInSegment(segment.id)}
                  className="flex flex-col gap-4 rounded-card border border-line bg-surface p-5 transition-colors duration-fast hover:border-line-strong hover:bg-surface-muted/50"
                >
                  <IconBadge icon={<Icon />} tone={segment.tone} size="lg" />
                  <div>
                    <p className="text-section">{segment.label}</p>
                    <p className="mt-0.5 text-sub text-ink-muted">
                      {count} {count === 1 ? 'task' : 'tasks'}
                    </p>
                  </div>
                </Link>
              );
            })}
      </div>

      <div className="mt-14 flex flex-col items-center text-center">
        <SproutIllustration size={120} />
        <p className="mt-4 max-w-sm text-bodysm text-ink-muted">
          Keep your tasks organized and stay on track.
        </p>
      </div>
    </Page>
  );
}
