import { Navigate, useLocation } from 'react-router-dom';
import { LoadingScreen } from '@/shared/components';
import { useAppSelector } from '@/app/store/hooks.js';
import { ROUTES } from '@/app/navigation/routes.js';
import { selectAuthLoading, selectIsManager, selectUser } from '../store/authSlice.js';

/**
 * Gates a route behind authentication, and optionally behind manager rights.
 *
 * @param {Object} props
 * @param {import('react').ReactNode} props.children
 * @param {boolean} [props.requireManager]
 */
export default function ProtectedRoute({ children, requireManager = false }) {
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectAuthLoading);
  const isManager = useAppSelector(selectIsManager);
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to={ROUTES.login} replace state={{ from: location.pathname }} />;
  }

  if (requireManager && !isManager) {
    return <Navigate to={ROUTES.home} replace />;
  }

  return children;
}
