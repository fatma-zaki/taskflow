import { Outlet } from 'react-router-dom';
import AppShell from './AppShell.jsx';
import BottomNav from './BottomNav.jsx';
import { LayoutProvider } from './LayoutContext.jsx';

/**
 * Layout for the five primary destinations: a scrolling screen above a fixed
 * bottom navigation.
 */
export default function TabLayout() {
  return (
    <LayoutProvider hasBottomNav>
      <AppShell>
        <main data-scroll-area className="flex-1 overflow-y-auto overflow-x-hidden pb-nav-safe">
          <Outlet />
        </main>
        <BottomNav />
      </AppShell>
    </LayoutProvider>
  );
}
