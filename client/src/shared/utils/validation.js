/**
 * Field validators. Each returns an error message, or `null` when valid, so
 * they compose into a plain `{ field: error | null }` object.
 */

/**
 * @param {string | undefined} email
 * @returns {string | null}
 */
export const validateEmail = (email) => {
  if (!email) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address';
  return null;
};

/**
 * @param {string | undefined} name
 * @returns {string | null}
 */
export const validateName = (name) => {
  if (!name || !name.trim()) return 'Name is required';
  if (name.trim().length < 2) return 'Name must be at least 2 characters';
  if (name.trim().length > 50) return 'Name must be less than 50 characters';
  return null;
};

/**
 * @param {string | undefined} password
 * @returns {string | null}
 */
export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  if (!/(?=.*[a-z])/.test(password)) return 'Password must contain a lowercase letter';
  if (!/(?=.*[A-Z])/.test(password)) return 'Password must contain an uppercase letter';
  if (!/(?=.*\d)/.test(password)) return 'Password must contain a number';
  return null;
};

/**
 * @param {string | undefined} title
 * @returns {string | null}
 */
export const validateTitle = (title) => {
  if (!title || !title.trim()) return 'Title is required';
  if (title.trim().length < 3) return 'Title must be at least 3 characters';
  if (title.trim().length > 100) return 'Title must be less than 100 characters';
  return null;
};

/**
 * @param {string | undefined} date
 * @param {string} [fieldName]
 * @returns {string | null}
 */
export const validateDate = (date, fieldName = 'Date') => {
  if (!date) return `${fieldName} is required`;
  if (Number.isNaN(new Date(date).getTime())) return `Please enter a valid ${fieldName.toLowerCase()}`;
  return null;
};

/**
 * @param {string | undefined} endDate
 * @param {string | undefined} startDate
 * @returns {string | null}
 */
export const validateEndDate = (endDate, startDate) => {
  if (!endDate) return 'Due date is required';
  const end = new Date(endDate);
  if (Number.isNaN(end.getTime())) return 'Please enter a valid due date';
  if (startDate && end < new Date(startDate)) return 'Due date must be after the start date';
  return null;
};

/**
 * @param {unknown} value
 * @param {string} fieldName
 * @returns {string | null}
 */
export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === 'string' && !value.trim())) return `${fieldName} is required`;
  return null;
};

/**
 * @param {Record<string, string | null>} errors
 * @returns {boolean} true when no field holds an error.
 */
export const isValid = (errors) => Object.values(errors).every((error) => !error);
