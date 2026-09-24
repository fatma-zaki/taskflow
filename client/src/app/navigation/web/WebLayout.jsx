import { Outlet } from 'react-router-dom';
import { LayoutProvider } from '../LayoutContext.jsx';
import WebSidebar from './WebSidebar.jsx';
import WebTopbar from './WebTopbar.jsx';

/**
 * The web app shell: a persistent sidebar, a top bar, and the page beside them.
 * Every authenticated route renders inside this on desktop viewports.
 */
export default function WebLayout() {
  return (
    <LayoutProvider hasBottomNav={false}>
      <div className="flex min-h-screen bg-app">
        <WebSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <WebTopbar />
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </LayoutProvider>
  );
}
