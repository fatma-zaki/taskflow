import { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { apiErrorMessage, authApi } from '@/services/api';
import { useAppDispatch } from '@/app/store/hooks.js';
import { isValid, validateEmail, validateName } from '@/shared/utils/validation.js';
import { useCurrentUser, userUpdated } from '@/features/auth';

/**
 * Editing the signed-in user's own profile.
 *
 * @param {{ onSaved?: () => void }} [options]
 * @returns {{
 *   values: { name: string, email: string },
 *   errors: { name: string | null, email: string | null },
 *   setField: (field: 'name' | 'email', value: string) => void,
 *   save: () => void,
 *   isSaving: boolean,
 *   isDirty: boolean,
 * }}
 */
export function useProfileForm({ onSaved } = {}) {
  const { user } = useCurrentUser();
  const dispatch = useAppDispatch();

  const [values, setValues] = useState({ name: user?.name ?? '', email: user?.email ?? '' });
  const [errors, setErrors] = useState({ name: /** @type {string | null} */ (null), email: /** @type {string | null} */ (null) });

  const mutation = useMutation({
    /** @param {{ name: string, email: string }} changes */
    mutationFn: (changes) => authApi.updateMe(changes),
    onSuccess: ({ user: updated }) => {
      dispatch(userUpdated(updated));
      toast.success('Profile updated');
      onSaved?.();
    },
    onError: (error) => toast.error(apiErrorMessage(error, 'Could not update your profile')),
  });

  const setField = useCallback((field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: null }));
  }, []);

  const save = useCallback(() => {
    const nextErrors = { name: validateName(values.name), email: validateEmail(values.email) };
    setErrors(nextErrors);
    if (isValid(nextErrors)) mutation.mutate(values);
  }, [values, mutation]);

  return {
    values,
    errors,
    setField,
    save,
    isSaving: mutation.isPending,
    isDirty: values.name !== user?.name || values.email !== user?.email,
  };
}

export default useProfileForm;
