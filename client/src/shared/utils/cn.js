/**
 * Join conditional class names.
 *
 * @param {...(string | false | null | undefined)} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default cn;
