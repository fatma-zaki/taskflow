/**
 * Preferences the app displays but does not yet store server-side.
 *
 * TaskFlow ships light mode in English only; these constants keep that fact in
 * one place, so the day a theme or locale setting is added, the rows that read
 * them become interactive without being rebuilt.
 */
export const APP_PREFERENCES = Object.freeze({
  appearance: 'Light',
  language: 'English',
});

export const APP_INFO = Object.freeze({
  version: '1.0.0',
  supportEmail: 'support@taskflow.app',
  tagline: 'Plan your day, one task at a time.',
});

/** Reminder lead times offered by the notification rules screen. */
export const REMINDER_HOUR_OPTIONS = /** @type {const} */ ([
  { value: '1', label: '1 hour before' },
  { value: '2', label: '2 hours before' },
  { value: '4', label: '4 hours before' },
  { value: '12', label: '12 hours before' },
  { value: '24', label: '1 day before' },
  { value: '48', label: '2 days before' },
  { value: '72', label: '3 days before' },
]);

/** Key of the reminder setting in the settings API. */
export const REMINDER_SETTING_KEY = 'reminder_before_hours';

