import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, Settings, UserRound } from 'lucide-react';
import { Avatar, MenuDropdown } from '@/shared/components';
import { useAppDispatch } from '@/app/store/hooks.js';
import { logout, useCurrentUser } from '@/features/auth';
import { ROUTES } from '../routes.js';

const itemClass =
  'flex w-full items-center gap-2.5 px-4 py-2.5 text-bodysm text-ink transition-colors duration-fast hover:bg-surface-muted';

/**
 * Account menu in the top bar: who you are, and the three things you do with
 * that — profile, settings, sign out.
 */
export default function WebAccountMenu() {
  const { user } = useCurrentUser();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <MenuDropdown
      panelClassName="w-60"
      trigger={({ toggle }) => (
        <button
          type="button"
          onClick={toggle}
          className="press flex items-center gap-2 rounded-md py-1 pl-1 pr-2 transition-colors duration-fast hover:bg-surface-muted"
        >
          <Avatar name={user?.name} size="sm" />
          <span className="hidden max-w-[10rem] truncate text-bodysm font-semibold text-ink desktop:block">
            {user?.name}
          </span>
          <ChevronDown size={16} className="text-ink-faint" />
        </button>
      )}
    >
      <div className="border-b border-line px-4 py-3">
        <p className="truncate text-bodysm font-semibold text-ink">{user?.name}</p>
        <p className="truncate text-caption text-ink-muted">{user?.email}</p>
      </div>

      <Link to={ROUTES.profile} className={itemClass}>
        <UserRound size={17} className="text-ink-muted" />
        Profile
      </Link>
      <Link to={ROUTES.settings} className={itemClass}>
        <Settings size={17} className="text-ink-muted" />
        Settings
      </Link>

      <button
        type="button"
        onClick={() => {
          dispatch(logout());
          navigate(ROUTES.login, { replace: true });
        }}
        className={`${itemClass} border-t border-line text-danger`}
      >
        <LogOut size={17} />
        Log out
      </button>
    </MenuDropdown>
  );
}
