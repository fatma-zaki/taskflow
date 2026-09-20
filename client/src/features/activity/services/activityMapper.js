import { AlertCircle, BellRing, CheckCircle2, MessageSquare, UserRoundPlus } from 'lucide-react';
import { formatTimeAgo } from '@/shared/utils/date.js';

/**
 * Turns a notification record into what the activity feed renders.
 *
 * The backend emits five notification types; each maps to an icon and tone
 * here, so a new type needs one entry and nothing else.
 *
 * @typedef {import('@/shared/types').AppNotification} AppNotification
 * @typedef {import('@/shared/types').NotificationType} NotificationType
 * @typedef {import('@/shared/theme/tones.js').Tone} Tone
 *
 * @typedef {Object} ActivityItem
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} timeLabel
 * @property {boolean} unread
 * @property {import('lucide-react').LucideIcon} icon
 * @property {Tone} tone
 */

/** @type {Record<NotificationType, { icon: import('lucide-react').LucideIcon, tone: Tone }>} */
const TYPE_META = {
  assignment: { icon: UserRoundPlus, tone: 'info' },
  reminder: { icon: BellRing, tone: 'primary' },
  overdue: { icon: AlertCircle, tone: 'danger' },
  status_change: { icon: CheckCircle2, tone: 'success' },
  task_created: { icon: MessageSquare, tone: 'primary' },
};

const FALLBACK_META = { icon: BellRing, tone: /** @type {Tone} */ ('neutral') };

/**
 * @param {AppNotification} notification
 * @returns {ActivityItem}
 */
export function toActivityItem(notification) {
  const meta = TYPE_META[notification.type] ?? FALLBACK_META;

  return {
    id: notification._id,
    title: notification.title,
    description: notification.message,
    timeLabel: formatTimeAgo(notification.createdAt),
    unread: !notification.read,
    icon: meta.icon,
    tone: meta.tone,
  };
}

/**
 * @param {AppNotification[]} notifications
 * @returns {ActivityItem[]}
 */
export const toActivityFeed = (notifications) => notifications.map(toActivityItem);
