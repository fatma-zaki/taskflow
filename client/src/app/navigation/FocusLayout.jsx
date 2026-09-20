import { Outlet } from 'react-router-dom';
import AppShell from './AppShell.jsx';
import { LayoutProvider } from './LayoutContext.jsx';

/**
 * Layout for screens that take over the app — forms, detail views and sign-in.
 * The navigation is hidden so the screen owns the full height and one clear
 * way back.
 */
export default function FocusLayout() {
  return (
    <LayoutProvider hasBottomNav={false}>
      <AppShell>
        <main data-scroll-area className="flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>
      </AppShell>
    </LayoutProvider>
  );
}
