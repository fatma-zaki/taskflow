import { Outlet } from 'react-router-dom';
import { usePlatform } from '@/app/platform/PlatformProvider.jsx';
import { ProtectedRoute } from '@/features/auth';
import TabLayout from './TabLayout.jsx';
import FocusLayout from './FocusLayout.jsx';
import WebLayout from './web/WebLayout.jsx';

/**
 * Renders a route's screen or its page, depending on the viewport.
 *
 * @param {Object} props
 * @param {import('./routeTable.jsx').AppRoute} props.route
 */
export function PlatformView({ route }) {
  const { isDesktop } = usePlatform();
  const View = isDesktop ? route.desktop : route.mobile;

  return route.requireManager ? (
    <ProtectedRoute requireManager>
      <View />
    </ProtectedRoute>
  ) : (
    <View />
  );
}

/**
 * The shell around a route: the web app's sidebar layout on wide viewports,
 * and on phones either the tab bar or a focused, full-height screen.
 *
 * @param {Object} props
 * @param {import('./routeTable.jsx').MobileLayout} props.mobileLayout
 */
export function PlatformLayout({ mobileLayout }) {
  const { isDesktop } = usePlatform();

  if (isDesktop) return <WebLayout />;
  return mobileLayout === 'tab' ? <TabLayout /> : <FocusLayout />;
}

/**
 * The shell for signed-out routes: no navigation on either platform. The web
 * sign-in page brings its own full-height layout.
 */
export function PublicLayout() {
  const { isDesktop } = usePlatform();

  return isDesktop ? <Outlet /> : <FocusLayout />;
}
