import { useState } from 'react';
import { AlertCircle, BellRing, UserRoundPlus } from 'lucide-react';
import {
  Badge,
  Button,
  EmptyState,
  IconBadge,
  ListRow,
  Page,
  PageHeader,
  Panel,
  RowGroup,
  SelectField,
  Spinner,
} from '@/shared/components';
import { useCurrentUser } from '@/features/auth';
import { REMINDER_HOUR_OPTIONS } from '../../constants/appPreferences.js';
import { useNotificationRules } from '../../hooks/useNotificationRules.js';

/** The notification types the server sends; the backend has no per-type switch yet. */
const NOTIFICATION_TYPES = [
  {
    id: 'assignment',
    label: 'Assignments',
    description: 'When a task is given to someone',
    icon: UserRoundPlus,
    tone: /** @type {const} */ ('info'),
  },
  {
    id: 'reminder',
    label: 'Reminders',
    description: 'Before a task is due',
    icon: BellRing,
    tone: /** @type {const} */ ('primary'),
  },
  {
    id: 'overdue',
    label: 'Overdue alerts',
    description: 'When a deadline passes',
    icon: AlertCircle,
    tone: /** @type {const} */ ('danger'),
  },
];

/**
 * Notification rules on the web. Managers and admins set the reminder
 * schedule; everyone else sees what the app will send them.
 */
export default function NotificationRulesPage() {
  const { isManager } = useCurrentUser();
  const { reminderHours, isLoading, save, isSaving } = useNotificationRules({ enabled: isManager });
  const [draftHours, setDraftHours] = useState(/** @type {string | null} */ (null));

  const selectedHours = draftHours ?? reminderHours;

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <Page width="narrow">
      <PageHeader
        title="Notifications"
        description="When TaskFlow reaches out, and about what."
        actions={
          isManager ? (
            <Button
              size="md"
              onClick={() => save(selectedHours)}
              loading={isSaving}
              disabled={selectedHours === reminderHours}
            >
              Save rules
            </Button>
          ) : null
        }
      />

      <div className="space-y-5">
        {isManager ? (
          <Panel title="Reminder schedule">
            <SelectField
              name="reminder-hours"
              label="Send reminders"
              value={selectedHours}
              onChange={setDraftHours}
              options={[...REMINDER_HOUR_OPTIONS]}
              className="max-w-xs"
            />
            <p className="mt-2 text-sub text-ink-muted">
              Applies to everyone in the workspace.
            </p>
          </Panel>
        ) : (
          <Panel>
            <EmptyState
              size="compact"
              title="Managed by your admin"
              description="Reminder timing is set for the whole workspace."
            />
          </Panel>
        )}

        <Panel title="What you'll receive" padding="none">
          <RowGroup className="rounded-none border-0">
            {NOTIFICATION_TYPES.map((type) => (
              <ListRow
                key={type.id}
                label={type.label}
                description={type.description}
                leading={<IconBadge icon={<type.icon />} tone={type.tone} />}
                value={<Badge tone="success">On</Badge>}
                chevron={false}
              />
            ))}
          </RowGroup>
        </Panel>
      </div>
    </Page>
  );
}
