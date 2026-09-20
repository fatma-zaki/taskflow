/**
 * The API returns Mongo documents (`_id`) while the auth payload uses `id`,
 * and reference fields arrive either populated or as a bare id string.
 * These helpers are the only place that discrepancy is handled.
 */

/**
 * @param {{ _id?: string, id?: string } | string | null | undefined} entity
 * @returns {string | undefined}
 */
export function entityId(entity) {
  if (!entity) return undefined;
  if (typeof entity === 'string') return entity;
  return entity._id ?? entity.id;
}

/**
 * @param {{ _id?: string, id?: string } | string | null | undefined} a
 * @param {{ _id?: string, id?: string } | string | null | undefined} b
 * @returns {boolean}
 */
export function isSameEntity(a, b) {
  const left = entityId(a);
  const right = entityId(b);
  return Boolean(left) && left === right;
}

/**
 * Reads a populated reference, returning `undefined` when only an id is present.
 *
 * @template T
 * @param {T | string | null | undefined} ref
 * @returns {T | undefined}
 */
export function populated(ref) {
  return ref && typeof ref === 'object' ? /** @type {T} */ (ref) : undefined;
}

/**
 * Initials for an avatar, e.g. "Sarah Ahmed" → "SA".
 *
 * @param {string | undefined} name
 * @returns {string}
 */
export function initialsOf(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part.charAt(0).toUpperCase()).join('') || '?';
}
