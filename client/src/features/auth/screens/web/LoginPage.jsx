import { Navigate, useLocation } from 'react-router-dom';
import { ArrowRight, AtSign, CalendarDays, CheckSquare, ListChecks, Lock } from 'lucide-react';
import { ROUTES } from '@/app/navigation/routes.js';
import { BrandLogo, Button, IconBadge, InputField } from '@/shared/components';
import { useAppSelector } from '@/app/store/hooks.js';
import { selectUser } from '../../store/authSlice.js';
import { useLoginForm } from '../../hooks/useLoginForm.js';
import DemoAccounts from '../../components/DemoAccounts.jsx';

const HIGHLIGHTS = [
  { id: 'plan', icon: CheckSquare, tone: /** @type {const} */ ('primary'), text: 'Plan the day in one place' },
  { id: 'track', icon: ListChecks, tone: /** @type {const} */ ('success'), text: 'Track what your team is on' },
  { id: 'never-miss', icon: CalendarDays, tone: /** @type {const} */ ('info'), text: 'Never miss a deadline' },
];

/**
 * Sign in on the web: the brand on the left, the form on the right.
 */
export default function LoginPage() {
  const location = useLocation();
  const user = useAppSelector(selectUser);
  const { values, errors, setField, fill, submit, isSubmitting, serverError } = useLoginForm();

  if (user) {
    const from = /** @type {{ from?: string } | null} */ (location.state)?.from;
    return <Navigate to={from ?? ROUTES.home} replace />;
  }

  return (
    <div className="flex min-h-screen bg-app">
      <aside className="hidden w-1/2 flex-col justify-between border-r border-line bg-surface-muted p-12 desktop:flex">
        <BrandLogo size="md" />

        <div className="max-w-md">
          <h2 className="text-hero text-ink">
            Small steps,
            <br />
            <span className="text-primary-strong">big progress.</span>
          </h2>
          <p className="mt-4 text-body text-ink-muted">
            TaskFlow keeps the work, the deadlines and the people in one calm place.
          </p>

          <ul className="mt-9 space-y-4">
            {HIGHLIGHTS.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <IconBadge icon={<item.icon />} tone={item.tone} />
                <span className="text-bodysm font-medium text-ink">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sub text-ink-faint">© {new Date().getFullYear()} TaskFlow</p>
      </aside>

      <main className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="desktop:hidden">
            <BrandLogo size="md" />
          </div>

          <h1 className="mt-8 text-display desktop:mt-0">Welcome back</h1>
          <p className="mt-2 text-bodysm text-ink-muted">Sign in to pick up where you left off.</p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              submit();
            }}
          >
            <InputField
              name="email"
              type="email"
              label="Email address"
              value={values.email}
              onChange={(value) => setField('email', value)}
              placeholder="you@company.com"
              error={errors.email}
              leading={<AtSign size={16} className="text-ink-faint" />}
            />
            <InputField
              name="password"
              type="password"
              label="Password"
              value={values.password}
              onChange={(value) => setField('password', value)}
              placeholder="Your password"
              error={errors.password}
              leading={<Lock size={16} className="text-ink-faint" />}
            />

            {serverError ? (
              <p className="rounded-card bg-danger-soft px-4 py-3 text-sub text-danger">{serverError}</p>
            ) : null}

            <Button
              type="submit"
              fullWidth
              loading={isSubmitting}
              className="mt-2"
            >
              Sign in
              <ArrowRight size={18} />
            </Button>
          </form>

          <DemoAccounts onSelect={fill} className="mt-6" />
        </div>
      </main>
    </div>
  );
}
