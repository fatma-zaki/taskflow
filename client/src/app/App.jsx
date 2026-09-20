import AppProviders from './providers/AppProviders.jsx';
import AppRoutes from './navigation/AppRoutes.jsx';

/**
 * TaskFlow — a mobile-first task manager.
 */
export default function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
}
