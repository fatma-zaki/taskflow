import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks.js';
import { isValid, validateEmail, validateRequired } from '@/shared/utils/validation.js';
import { clearError, login, selectAuthError, selectAuthLoading } from '../store/authSlice.js';

/**
 * Sign-in form state and submission, shared by the phone screen and the web
 * page.
 *
 * @returns {{
 *   values: { email: string, password: string },
 *   errors: { email: string | null, password: string | null },
 *   setField: (field: 'email' | 'password', value: string) => void,
 *   fill: (credentials: { email: string, password: string }) => void,
 *   submit: () => void,
 *   isSubmitting: boolean,
 *   serverError: string | null,
 * }}
 */
export function useLoginForm() {
  const dispatch = useAppDispatch();
  const isSubmitting = useAppSelector(selectAuthLoading);
  const serverError = useAppSelector(selectAuthError);

  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState(
    /** @type {{ email: string | null, password: string | null }} */ ({ email: null, password: null }),
  );

  /** Leaving the screen should not leave a stale error behind. */
  useEffect(
    () => () => {
      dispatch(clearError());
    },
    [dispatch],
  );

  return {
    values,
    errors,
    isSubmitting,
    serverError,
    setField: (field, value) => {
      setValues((current) => ({ ...current, [field]: value }));
      setErrors((current) => ({ ...current, [field]: null }));
    },
    fill: (credentials) => {
      setValues(credentials);
      setErrors({ email: null, password: null });
      dispatch(clearError());
    },
    submit: () => {
      const nextErrors = {
        email: validateEmail(values.email),
        password: validateRequired(values.password, 'Password'),
      };
      setErrors(nextErrors);
      if (isValid(nextErrors)) dispatch(login(values));
    },
  };
}

export default useLoginForm;
