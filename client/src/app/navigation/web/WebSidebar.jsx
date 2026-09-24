import { Link, useLocation } from 'react-router-dom';
import { BrandLogo } from '@/shared/components';
import { cn } from '@/shared/utils/cn.js';
import { useCurrentUser } from '@/features/auth';
import { ROUTES } from '../routes.js';
import {
  WEB_NAV_FOOTER_ITEM,
  WEB_NAV_SECTIONS,
  isNavItemActive,
  visibleItems,
} from '../navItems.js';

/**
 * @param {Object} props
 * @param {import('../navItems.js').NavItem} props.item
 * @param {boolean} props.active
 */
function SidebarLink({ item, active }) {
  const Icon = item.icon;

  return (
    <Link
      to={item.to}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'relative flex items-center gap-3 rounded-md px-3 py-2.5 text-bodysm transition-colors duration-fast',
        active ? 'bg-primary-soft font-semibold text-ink' : 'text-ink-muted hover:bg-surface-muted hover:text-ink',
      )}
    >
      {active ? (
        <span aria-hidden="true" className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
      ) : null}
      <Icon size={18} strokeWidth={active ? 2.4 : 2} className={active ? 'text-primary-strong' : ''} />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

/**
 * The web app's primary navigation: a fixed rail listing every destination,
 * built from the same config the phone's bottom bar uses.
 */
export default function WebSidebar() {
  const { pathname } = useLocation();
  const { isManager } = useCurrentUser();

  return (
    <aside className="sticky top-0 flex h-screen w-sidebar shrink-0 flex-col border-r border-line bg-surface">
      <div className="px-5 py-5">
        <Link to={ROUTES.home} className="inline-flex">
          <BrandLogo size="md" />
        </Link>
      </div>

      <nav aria-label="Primary" className="flex-1 space-y-6 overflow-y-auto px-3 pb-4" data-scroll-area>
        {WEB_NAV_SECTIONS.map((section) => {
          const items = visibleItems(section, { isManager });
          if (items.length === 0) return null;

          return (
            <div key={section.id}>
              {section.label ? (
                <p className="px-3 pb-2 text-micro font-bold uppercase tracking-wide text-ink-faint">
                  {section.label}
                </p>
              ) : null}
              <div className="space-y-0.5">
                {items.map((item) => (
                  <SidebarLink key={item.id} item={item} active={isNavItemActive(pathname, item)} />
                ))}
              </div>
            </div>
          );
        })}
      </nav>

      <div className="border-t border-line p-3">
        <SidebarLink
          item={WEB_NAV_FOOTER_ITEM}
          active={isNavItemActive(pathname, WEB_NAV_FOOTER_ITEM)}
        />
      </div>
    </aside>
  );
}
