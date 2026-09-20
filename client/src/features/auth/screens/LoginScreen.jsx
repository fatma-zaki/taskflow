import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AtSign, Lock } from 'lucide-react';
import { ROUTES } from '@/app/navigation/routes.js';
import { BrandLogo, Button, Card, Screen, TextField } from '@/shared/components';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks.js';
import { isValid, validateEmail, validateRequired } from '@/shared/utils/validation.js';
import { clearError, login, selectAuthError, selectAuthLoading, selectUser } from '../store/authSlice.js';

/**
 * Sign in. Same mobile language as the rest of the app: one card, big targets,
 * a single primary action.
 */
export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectAuthLoading);
  const serverError = useAppSelector(selectAuthError);

  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState(
    /** @type {{ email: string | null, password: string | null }} */ ({ email: null, password: null }),
  );

  useEffect(() => () => { dispatch(clearError()); }, [dispatch]);

  if (user) {
    const from = /** @type {{ from?: string } | null} */ (location.state)?.from;
    return <Navigate to={from ?? ROUTES.home} replace />;
  }

  /** @param {'email' | 'password'} field @param {string} value */
  const setField = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: null }));
  };

  const submit = () => {
    const nextErrors = {
      email: validateEmail(values.email),
      password: validateRequired(values.password, 'Password'),
    };
    setErrors(nextErrors);
    if (isValid(nextErrors)) dispatch(login(values));
  };

  return (
    <Screen
      footer={
        <Button fullWidth onClick={submit} loading={loading}>
          Sign in
        </Button>
      }
    >
      <div className="pt-16">
        <BrandLogo size="lg" withWordmark={false} />
        <h1 className="mt-6 text-display">
          Welcome back
          <br />
          to TaskFlow
        </h1>
        <p className="mt-2 text-sub text-ink-muted">Sign in to pick up where you left off.</p>
      </div>

      <Card padding="none" className="mt-8 divide-y divide-line">
        <TextField
          name="email"
          type="email"
          value={values.email}
          onChange={(value) => setField('email', value)}
          label="Email address"
          placeholder="Email address"
          error={errors.email}
          leading={<AtSign size={18} className="text-ink-faint" />}
        />
        <TextField
          name="password"
          type="password"
          value={values.password}
          onChange={(value) => setField('password', value)}
          label="Password"
          placeholder="Password"
          error={errors.password}
          leading={<Lock size={18} className="text-ink-faint" />}
        />
      </Card>

      {serverError ? (
        <p className="mt-4 rounded-card bg-danger-soft px-4 py-3 text-sub text-danger">{serverError}</p>
      ) : null}
    </Screen>
  );
}
