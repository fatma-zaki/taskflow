import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/shared/utils/cn.js';
import { BOTTOM_NAV_ITEMS, isNavItemActive } from './navItems.js';

/**
 * Fixed bottom navigation: icon above label, a soft yellow disc behind the
 * active icon, muted grey for the rest.
 */
export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface pb-safe shadow-nav"
    >
      <ul className="flex h-nav items-stretch">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const active = isNavItemActive(pathname, item);
          const Icon = item.icon;

          return (
            <li key={item.id} className="flex-1">
              <Link
                to={item.to}
                aria-current={active ? 'page' : undefined}
                className="press flex h-full flex-col items-center justify-center gap-1 pt-1"
              >
                <span
                  className={cn(
                    'flex h-7 w-12 items-center justify-center rounded-full',
                    'transition-colors duration-fast',
                    active ? 'bg-primary-soft text-primary-strong' : 'text-ink-faint',
                  )}
                >
                  <Icon size={20} strokeWidth={active ? 2.4 : 2} />
                </span>
                <span
                  className={cn(
                    'text-micro transition-colors duration-fast',
                    active ? 'font-bold text-ink' : 'font-medium text-ink-faint',
                  )}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
