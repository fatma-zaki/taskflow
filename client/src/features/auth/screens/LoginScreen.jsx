import { Navigate, useLocation } from 'react-router-dom';
import { AtSign, Lock } from 'lucide-react';
import { ROUTES } from '@/app/navigation/routes.js';
import { BrandLogo, Button, Card, Screen, TextField } from '@/shared/components';
import { useAppSelector } from '@/app/store/hooks.js';
import { selectUser } from '../store/authSlice.js';
import { useLoginForm } from '../hooks/useLoginForm.js';

/**
 * Sign in on a phone: one card, big targets, a single primary action.
 */
export default function LoginScreen() {
  const location = useLocation();
  const user = useAppSelector(selectUser);
  const { values, errors, setField, submit, isSubmitting, serverError } = useLoginForm();

  if (user) {
    const from = /** @type {{ from?: string } | null} */ (location.state)?.from;
    return <Navigate to={from ?? ROUTES.home} replace />;
  }

  return (
    <Screen
      footer={
        <Button fullWidth onClick={submit} loading={isSubmitting}>
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
