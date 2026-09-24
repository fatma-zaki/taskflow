import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { apiErrorMessage, authApi, queryKeys, usersApi } from '@/services/api';

/**
 * @typedef {import('@/shared/types').User} User
 */

/**
 * @returns {() => void}
 */
function useInvalidateUsers() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
}

/**
 * New team members are created through the register endpoint.
 *
 * @param {{ onCreated?: () => void }} [options]
 * @returns {{
 *   createUser: (input: { name: string, email: string, password: string, role: string }) => void,
 *   isPending: boolean,
 * }}
 */
export function useCreateUser(options = {}) {
  const invalidate = useInvalidateUsers();

  const mutation = useMutation({
    /** @param {{ name: string, email: string, password: string, role: string }} input */
    mutationFn: (input) => authApi.register(input),
    onSuccess: () => {
      invalidate();
      toast.success('Team member added');
      options.onCreated?.();
    },
    onError: (error) => toast.error(apiErrorMessage(error, 'Could not add this person')),
  });

  return { createUser: mutation.mutate, isPending: mutation.isPending };
}

/**
 * @param {string} id
 * @param {{ onSaved?: () => void }} [options]
 * @returns {{ saveUser: (changes: Partial<User>) => void, isPending: boolean }}
 */
export function useUpdateUser(id, options = {}) {
  const invalidate = useInvalidateUsers();

  const mutation = useMutation({
    /** @param {Partial<User>} changes */
    mutationFn: (changes) => usersApi.update(id, changes),
    onSuccess: () => {
      invalidate();
      toast.success('Changes saved');
      options.onSaved?.();
    },
    onError: (error) => toast.error(apiErrorMessage(error, 'Could not save your changes')),
  });

  return { saveUser: mutation.mutate, isPending: mutation.isPending };
}

/**
 * @param {{ onDeleted?: () => void }} [options]
 * @returns {{ removeUser: (id: string) => void }}
 */
export function useDeleteUser(options = {}) {
  const invalidate = useInvalidateUsers();

  const mutation = useMutation({
    /** @param {string} id */
    mutationFn: (id) => usersApi.remove(id),
    onSuccess: () => {
      invalidate();
      toast.success('Team member deactivated');
      options.onDeleted?.();
    },
    onError: (error) => toast.error(apiErrorMessage(error, 'Could not deactivate this person')),
  });

  return { removeUser: mutation.mutate };
}
