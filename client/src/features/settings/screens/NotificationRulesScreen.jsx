import { useState } from 'react';
import { AlertCircle, BellRing, Clock, UserRoundPlus } from 'lucide-react';
import { ROUTES } from '@/app/navigation/routes.js';
import {
  Badge,
  Button,
  EmptyState,
  FormRow,
  IconBadge,
  ListRow,
  OptionSheet,
  RowGroup,
  Screen,
  ScreenHeader,
  Section,
  Spinner,
  TextLink,
} from '@/shared/components';
import { useDisclosure } from '@/shared/hooks';
import { useCurrentUser } from '@/features/auth';
import { REMINDER_HOUR_OPTIONS } from '../constants/appPreferences.js';
import { useNotificationRules } from '../hooks/useNotificationRules.js';

/** The notification types the server sends; the backend has no per-type switch yet. */
const NOTIFICATION_TYPES = [
  { id: 'assignment', label: 'Assignments', description: 'When a task is given to someone', icon: UserRoundPlus, tone: /** @type {const} */ ('info') },
  { id: 'reminder', label: 'Reminders', description: 'Before a task is due', icon: BellRing, tone: /** @type {const} */ ('primary') },
  { id: 'overdue', label: 'Overdue alerts', description: 'When a deadline passes', icon: AlertCircle, tone: /** @type {const} */ ('danger') },
];

/**
 * Notification rules. Managers and admins edit the reminder schedule; everyone
 * else sees what the app will send them.
 */
export default function NotificationRulesScreen() {
  const { isManager } = useCurrentUser();
  const picker = useDisclosure();
  const { reminderHours, isLoading, save, isSaving } = useNotificationRules({ enabled: isManager });
  const [draftHours, setDraftHours] = useState(/** @type {string | null} */ (null));

  const selectedHours = draftHours ?? reminderHours;
  const selectedLabel =
    REMINDER_HOUR_OPTIONS.find((option) => option.value === selectedHours)?.label ?? `${selectedHours} hours before`;

  return (
    <Screen
      header={<ScreenHeader title="Notifications" showBack backTo={ROUTES.settings} />}
      footer={
        isManager ? (
          <Button
            fullWidth
            onClick={() => save(selectedHours)}
            loading={isSaving}
            disabled={selectedHours === reminderHours}
          >
            Save rules
          </Button>
        ) : undefined
      }
    >
      {isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          {isManager ? (
            <Section title="Reminder schedule" className="mt-2">
              <RowGroup>
                <FormRow
                  label="Send reminders"
                  value={selectedLabel}
                  icon={<Clock size={18} />}
                  onClick={picker.show}
                />
              </RowGroup>
            </Section>
          ) : (
            <EmptyState
              size="compact"
              title="Managed by your admin"
              description="Reminder timing is set for the whole workspace."
            />
          )}

          <Section title="What you'll receive" className="mt-6">
            <RowGroup>
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
          </Section>

          <div className="mt-6">
            <TextLink to={ROUTES.activity}>See recent activity</TextLink>
          </div>
        </>
      )}

      <OptionSheet
        open={picker.open}
        onClose={picker.hide}
        title="Reminder schedule"
        options={[...REMINDER_HOUR_OPTIONS]}
        value={selectedHours}
        onSelect={setDraftHours}
      />
    </Screen>
  );
}
