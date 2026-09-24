/**
 * Who may change whom.
 *
 * Mirrors the server's rules: managers look after regular members, admins look
 * after everyone but themselves.
 */
import { isSameEntity } from '@/shared/utils/entity.js';

/**
 * @typedef {import('@/shared/types').User} User
 * @typedef {{ current: User | null, isAdmin: boolean, isManager: boolean }} ActorContext
 */

/**
 * @param {User} target
 * @param {ActorContext} actor
 * @returns {boolean}
 */
export function canEditUser(target, { current, isAdmin, isManager }) {
  if (isAdmin) return !isSameEntity(target, current);
  if (isManager) return target.role === 'user';
  return false;
}

/**
 * Deactivating is editing, minus anyone who is already inactive.
 *
 * @param {User} target
 * @param {ActorContext} actor
 * @returns {boolean}
 */
export function canDeactivateUser(target, actor) {
  return canEditUser(target, actor) && target.active !== false;
}

/**
 * @param {User[]} users
 * @param {{ search?: string, role?: string }} criteria
 * @returns {User[]}
 */
export function filterUsers(users, { search = '', role = '' }) {
  const term = search.trim().toLowerCase();

  return users.filter((user) => {
    const matchesRole = !role || user.role === role;
    const matchesTerm =
      !term || user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term);
    return matchesRole && matchesTerm;
  });
}
