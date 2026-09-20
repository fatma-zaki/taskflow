import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginScreen, ProtectedRoute } from '@/features/auth';
import { HomeScreen, MyDayScreen } from '@/features/dashboard';
import { CalendarScreen } from '@/features/calendar';
import { CategoriesScreen } from '@/features/categories';
import { ActivityScreen } from '@/features/activity';
import { CreateTaskScreen, EditTaskScreen, TaskDetailScreen, TasksScreen } from '@/features/tasks';
import {
  AboutScreen,
  MoreScreen,
  NotificationRulesScreen,
  ProfileScreen,
  SettingsScreen,
} from '@/features/settings';
import { EditUserScreen, UsersScreen } from '@/features/users';
import { ROUTES, ROUTE_PATTERNS } from './routes.js';
import TabLayout from './TabLayout.jsx';
import FocusLayout from './FocusLayout.jsx';

/**
 * The app's route table.
 *
 * Two layouts decide the shape of a screen: `TabLayout` keeps the bottom
 * navigation on screen, `FocusLayout` hands the whole height to one task.
 */
export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<FocusLayout />}>
        <Route path={ROUTES.login} element={<LoginScreen />} />
      </Route>

      {/* Primary destinations, with navigation */}
      <Route
        element={
          <ProtectedRoute>
            <TabLayout />
          </ProtectedRoute>
        }
      >
        <Route path={ROUTES.home} element={<HomeScreen />} />
        <Route path={ROUTES.calendar} element={<CalendarScreen />} />
        <Route path={ROUTES.tasks} element={<TasksScreen />} />
        <Route path={ROUTES.categories} element={<CategoriesScreen />} />
        <Route path={ROUTES.more} element={<MoreScreen />} />
        <Route path={ROUTES.myDay} element={<MyDayScreen />} />
        <Route path={ROUTES.activity} element={<ActivityScreen />} />
        <Route path={ROUTES.settings} element={<SettingsScreen />} />
        <Route
          path={ROUTES.users}
          element={
            <ProtectedRoute requireManager>
              <UsersScreen />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Focused screens: forms and detail views */}
      <Route
        element={
          <ProtectedRoute>
            <FocusLayout />
          </ProtectedRoute>
        }
      >
        <Route path={ROUTES.taskNew} element={<CreateTaskScreen />} />
        <Route path={ROUTE_PATTERNS.taskDetail} element={<TaskDetailScreen />} />
        <Route path={ROUTE_PATTERNS.taskEdit} element={<EditTaskScreen />} />
        <Route path={ROUTES.profile} element={<ProfileScreen />} />
        <Route path={ROUTES.about} element={<AboutScreen />} />
        <Route path={ROUTES.notificationRules} element={<NotificationRulesScreen />} />
        <Route
          path={ROUTE_PATTERNS.userEdit}
          element={
            <ProtectedRoute requireManager>
              <EditUserScreen />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Entry point and paths kept from the previous web app */}
      <Route path="/" element={<Navigate to={ROUTES.home} replace />} />
      <Route path="/dashboard" element={<Navigate to={ROUTES.home} replace />} />
      <Route path="/tasks/create" element={<Navigate to={ROUTES.taskNew} replace />} />
      <Route path="/notifications" element={<Navigate to={ROUTES.activity} replace />} />
      <Route path="/profile" element={<Navigate to={ROUTES.profile} replace />} />
      <Route path="/admin/notification-settings" element={<Navigate to={ROUTES.notificationRules} replace />} />
      <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
    </Routes>
  );
}
