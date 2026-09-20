import { ROUTES } from '@/app/navigation/routes.js';
import { BrandLogo, ListRow, RowGroup, Screen, ScreenHeader } from '@/shared/components';
import { APP_INFO } from '../constants/appPreferences.js';

/**
 * A short, honest about page.
 */
export default function AboutScreen() {
  return (
    <Screen header={<ScreenHeader title="About" showBack backTo={ROUTES.settings} />}>
      <div className="flex flex-col items-center pt-6 text-center">
        <BrandLogo size="lg" withWordmark={false} />
        <p className="mt-4 text-section">TaskFlow</p>
        <p className="mt-1 text-sub text-ink-muted">{APP_INFO.tagline}</p>
      </div>

      <RowGroup className="mt-8">
        <ListRow label="Version" value={APP_INFO.version} chevron={false} />
        <ListRow label="Support" value={APP_INFO.supportEmail} chevron={false} />
      </RowGroup>
    </Screen>
  );
}
