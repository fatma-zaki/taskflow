import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { apiErrorMessage, queryKeys, settingsApi } from '@/services/api';
import { REMINDER_SETTING_KEY } from '../constants/appPreferences.js';

/**
 * Organisation-wide notification rules. Only managers and admins may read or
 * write them, so the query stays disabled for everyone else.
 *
 * @param {{ enabled: boolean }} options
 * @returns {{
 *   reminderHours: string,
 *   isLoading: boolean,
 *   save: (hours: string) => void,
 *   isSaving: boolean,
 * }}
 */
export function useNotificationRules({ enabled }) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: queryKeys.settings.all,
    queryFn: () => settingsApi.list(),
    enabled,
  });

  const reminderSetting = query.data?.settings.find((setting) => setting.key === REMINDER_SETTING_KEY);

  const mutation = useMutation({
    /** @param {string} hours */
    mutationFn: (hours) =>
      settingsApi.update(REMINDER_SETTING_KEY, {
        value: hours,
        description: 'Hours before a task deadline to send its reminder',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.settings.all });
      toast.success('Notification rules updated');
    },
    onError: (error) => toast.error(apiErrorMessage(error, 'Could not update the rules')),
  });

  return {
    reminderHours: String(reminderSetting?.value ?? '24'),
    isLoading: enabled && query.isPending,
    save: mutation.mutate,
    isSaving: mutation.isPending,
  };
}

export default useNotificationRules;
