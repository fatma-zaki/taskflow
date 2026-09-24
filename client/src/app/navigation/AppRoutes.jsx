import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '@/features/auth';
import { ROUTES } from './routes.js';
import { APP_ROUTES, LEGACY_REDIRECTS, LOGIN_ROUTE } from './routeTable.jsx';
import { PlatformLayout, PlatformView, PublicLayout } from './PlatformRoute.jsx';

/**
 * The router. Every destination comes from `routeTable.jsx`, so adding a screen
 * is one entry there and nothing here.
 */
export default function AppRoutes() {
  /** @param {import('./routeTable.jsx').MobileLayout} layout */
  const routesFor = (layout) => APP_ROUTES.filter((route) => route.mobileLayout === layout);

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path={LOGIN_ROUTE.path} element={<PlatformView route={LOGIN_ROUTE} />} />
      </Route>

      {/* Primary destinations: the phone keeps its bottom navigation here. */}
      <Route
        element={
          <ProtectedRoute>
            <PlatformLayout mobileLayout="tab" />
          </ProtectedRoute>
        }
      >
        {routesFor('tab').map((route) => (
          <Route key={route.path} path={route.path} element={<PlatformView route={route} />} />
        ))}
      </Route>

      {/* Forms and detail views: the phone gives them the full height. */}
      <Route
        element={
          <ProtectedRoute>
            <PlatformLayout mobileLayout="focus" />
          </ProtectedRoute>
        }
      >
        {routesFor('focus').map((route) => (
          <Route key={route.path} path={route.path} element={<PlatformView route={route} />} />
        ))}
      </Route>

      {LEGACY_REDIRECTS.map(({ from, to }) => (
        <Route key={from} path={from} element={<Navigate to={to} replace />} />
      ))}
      <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
    </Routes>
  );
}
