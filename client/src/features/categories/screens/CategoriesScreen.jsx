import { ROUTES } from '@/app/navigation/routes.js';
import { Screen, ScreenHeader, SproutIllustration } from '@/shared/components';
import { useTaskSegments } from '../hooks/useTaskSegments.js';
import CategoryList from '../components/CategoryList.jsx';

/**
 * Screen 4 — Categories. Each row is a saved view into the task list.
 */
export default function CategoriesScreen() {
  const { segments, isLoading } = useTaskSegments();

  return (
    <Screen header={<ScreenHeader title="Categories" showBack backTo={ROUTES.home} />}>
      <div className="mt-1">
        <CategoryList segments={segments} isLoading={isLoading} />
      </div>

      <div className="mt-12 flex flex-col items-center text-center">
        <SproutIllustration />
        <p className="mt-3 max-w-[15rem] text-sub text-ink-muted">
          Keep your tasks organized and stay on track.
        </p>
      </div>
    </Screen>
  );
}
