/**
 * How each role is named and coloured in the interface. Used by the team list,
 * the profile and anywhere else a role is shown.
 */

/** @type {Record<import('@/shared/types').UserRole, string>} */
export const ROLE_LABELS = Object.freeze({
  admin: 'Admin',
  manager: 'Manager',
  user: 'Member',
});

/** @type {Record<import('@/shared/types').UserRole, import('@/shared/theme/tones.js').Tone>} */
export const ROLE_TONES = Object.freeze({
  admin: 'primary',
  manager: 'info',
  user: 'neutral',
});

/** Options for a role picker, in order of increasing access. */
export const ROLE_OPTIONS = /** @type {const} */ ([
  { value: 'user', label: 'Member', description: 'Works on assigned tasks' },
  { value: 'manager', label: 'Manager', description: 'Assigns and oversees work' },
  { value: 'admin', label: 'Admin', description: 'Full access to the workspace' },
]);
