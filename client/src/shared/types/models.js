/**
 * Domain model types shared across features.
 *
 * The API is MongoDB-backed, so entities are identified by `_id`; use
 * `entityId()` from `shared/utils/entity.js` rather than reading ids by hand.
 *
 * This file contains types only — it emits no runtime code.
 */

/**
 * @typedef {'admin' | 'manager' | 'user'} UserRole
 */

/**
 * @typedef {Object} User
 * @property {string} [_id]
 * @property {string} [id]
 * @property {string} name
 * @property {string} email
 * @property {UserRole} role
 * @property {boolean} [active]
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 */

/**
 * A populated reference: the API returns either an id string or the document.
 * @typedef {string | User} UserRef
 */

/**
 * @typedef {'upcoming' | 'in_progress' | 'completed' | 'overdue'} TaskStatus
 */

/**
 * @typedef {'low' | 'medium' | 'high'} TaskPriority
 */

/**
 * @typedef {Object} Task
 * @property {string} _id
 * @property {string} title
 * @property {string} [description]
 * @property {string} start_date ISO timestamp
 * @property {string} end_date ISO timestamp — the task's due moment
 * @property {TaskPriority} priority
 * @property {TaskStatus} status
 * @property {UserRef} assignee_id
 * @property {UserRef} reporter_id
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 */

/**
 * Payload accepted by `POST /tasks` and `PUT /tasks/:id`.
 * @typedef {Object} TaskDraft
 * @property {string} title
 * @property {string} description
 * @property {string} start_date
 * @property {string} end_date
 * @property {TaskPriority} priority
 * @property {string} assignee_id
 */

/**
 * @typedef {Object} Attachment
 * @property {string} _id
 * @property {string} originalname
 * @property {string} mimetype
 * @property {number} size
 * @property {UserRef} [uploaded_by]
 * @property {string} createdAt
 */

/**
 * @typedef {'assignment' | 'reminder' | 'overdue' | 'status_change' | 'task_created'} NotificationType
 */

/**
 * @typedef {Object} AppNotification
 * @property {string} _id
 * @property {NotificationType} type
 * @property {string} title
 * @property {string} message
 * @property {boolean} read
 * @property {Record<string, unknown>} [payload]
 * @property {string} createdAt
 */

/**
 * @typedef {Object} TaskCounts
 * @property {number} upcoming
 * @property {number} inProgress
 * @property {number} overdue
 * @property {number} completed
 */

/**
 * Response of `GET /dashboard`.
 * @typedef {Object} DashboardSummary
 * @property {Task[]} upcoming
 * @property {Task[]} inProgress
 * @property {Task[]} overdue
 * @property {TaskCounts} counts
 */

/**
 * @typedef {Object} AppSetting
 * @property {string} _id
 * @property {string} key
 * @property {unknown} value
 * @property {string} [description]
 */

export {};
