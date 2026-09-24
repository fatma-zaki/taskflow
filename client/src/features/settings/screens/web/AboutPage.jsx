import { BrandLogo, ListRow, Page, PageHeader, Panel, RowGroup } from '@/shared/components';
import { APP_INFO } from '../../constants/appPreferences.js';

/**
 * A short, honest about page.
 */
export default function AboutPage() {
  return (
    <Page width="narrow">
      <PageHeader title="About TaskFlow" />

      <Panel>
        <div className="flex items-center gap-4">
          <BrandLogo size="lg" withWordmark={false} />
          <div>
            <p className="text-section">TaskFlow</p>
            <p className="mt-1 text-bodysm text-ink-muted">{APP_INFO.tagline}</p>
          </div>
        </div>
      </Panel>

      <Panel className="mt-5" padding="none">
        <RowGroup className="rounded-none border-0">
          <ListRow label="Version" value={APP_INFO.version} chevron={false} />
          <ListRow label="Support" value={APP_INFO.supportEmail} chevron={false} />
        </RowGroup>
      </Panel>
    </Page>
  );
}
