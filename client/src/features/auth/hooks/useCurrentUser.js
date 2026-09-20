import { useAppSelector } from '@/app/store/hooks.js';
import { entityId } from '@/shared/utils/entity.js';
import { selectIsAdmin, selectIsManager, selectUser } from '../store/authSlice.js';

/**
 * The signed-in user plus the two role flags features branch on. Components ask
 * this hook instead of reaching into the auth slice themselves.
 *
 * @returns {{
 *   user: import('@/shared/types').User | null,
 *   userId: string | undefined,
 *   isAdmin: boolean,
 *   isManager: boolean,
 *   firstName: string,
 * }}
 */
export function useCurrentUser() {
  const user = useAppSelector(selectUser);
  const isAdmin = useAppSelector(selectIsAdmin);
  const isManager = useAppSelector(selectIsManager);

  return {
    user,
    userId: entityId(user),
    isAdmin,
    isManager,
    firstName: user?.name?.split(' ')[0] ?? '',
  };
}

export default useCurrentUser;
