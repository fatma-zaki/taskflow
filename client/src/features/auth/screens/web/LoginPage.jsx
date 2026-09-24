import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ArrowRight, ChartNoAxesColumn, Eye, EyeOff, Lock, Mail, SquareCheckBig, Zap } from 'lucide-react';
import { ROUTES } from '@/app/navigation/routes.js';
import { BrandLogo, Button } from '@/shared/components';
import { useAppSelector } from '@/app/store/hooks.js';
import { cn } from '@/shared/utils/cn.js';
import { selectUser } from '../../store/authSlice.js';
import { useLoginForm } from '../../hooks/useLoginForm.js';
import { DEMO_ACCOUNTS, showDemoAccounts } from '../../components/DemoAccounts.jsx';

const HIGHLIGHTS = [
  { id: 'organize', icon: SquareCheckBig, lines: ['Organize', 'your tasks'] },
  { id: 'focus', icon: Zap, lines: ['Boost', 'your focus'] },
  { id: 'goals', icon: ChartNoAxesColumn, lines: ['Achieve', 'your goals'] },
];

/**
 * Filled input used only on this page: tall, soft grey, no border until focused.
 *
 * @param {Object} props
 * @param {string} props.name
 * @param {string} props.label
 * @param {string} props.value
 * @param {(value: string) => void} props.onChange
 * @param {string} props.placeholder
 * @param {string} [props.type]
 * @param {string | null} [props.error]
 * @param {import('react').ReactNode} props.leading
 * @param {import('react').ReactNode} [props.trailing]
 */
function LoginField({ name, label, value, onChange, placeholder, type = 'text', error, leading, trailing }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-bodysm font-semibold text-ink">
        {label}
      </label>
      <div
        className={cn(
          'flex h-14 items-center gap-3.5 rounded-md border bg-surface-sunken px-5',
          'transition-colors duration-fast focus-within:border-primary focus-within:bg-surface',
          error ? 'border-danger' : 'border-transparent',
        )}
      >
        <span className="shrink-0 text-ink-muted">{leading}</span>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          className="w-full bg-transparent text-bodysm text-ink placeholder:text-ink-faint focus:outline-none"
        />
        {trailing}
      </div>
      {error ? <p className="mt-1.5 text-caption text-danger">{error}</p> : null}
    </div>
  );
}

/**
 * Sign in on the web: headline, highlights and illustration on the left, the
 * form in a raised card on the right.
 */
export default function LoginPage() {
  const location = useLocation();
  const user = useAppSelector(selectUser);
  const { values, errors, setField, fill, submit, isSubmitting, serverError } = useLoginForm();
  const [showPassword, setShowPassword] = useState(false);

  if (user) {
    const from = /** @type {{ from?: string } | null} */ (location.state)?.from;
    return <Navigate to={from ?? ROUTES.home} replace />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-app">
      {/* Decorations: yellow wash in the top-right corner, looping line bottom-left */}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="pointer-events-none absolute -right-10 -top-16 h-80 w-80 text-primary-soft"
      >
        <path
          fill="currentColor"
          d="M40 0h160v190c-20 5-45-8-60-35-18-32-12-60-40-80C80 60 45 40 40 0z"
        />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 520 200"
        fill="none"
        className="pointer-events-none absolute bottom-0 left-0 hidden w-[520px] text-primary desktop:block"
      >
        <path
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          d="M0 22C90 5 170 30 250 85c40 27 70 40 90 30 18-10 10-30-10-27-25 4-25 37 0 52 50 30 110 45 160 60"
        />
      </svg>

      <div className="relative flex min-h-screen gap-10 px-6 py-10 desktop:px-[100px] desktop:py-14">
        <aside className="hidden min-w-0 flex-1 flex-col pt-5 desktop:flex">
          <BrandLogo size="xl" />

          <div className="mt-8 flex items-center gap-6">
            <div className="shrink-0">
              <h2 className="text-jumbo text-ink">
                Small tasks.
                <br />
                <span className="text-primary-strong">Big progress.</span>
              </h2>
              <p className="mt-6 text-section font-medium text-ink-muted">
                Stay organized, get things done,
                <br />
                and make your day more productive.
              </p>

              <ul className="mt-10 flex gap-16">
                {HIGHLIGHTS.map((item) => (
                  <li key={item.id}>
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft text-ink">
                      <item.icon size={22} strokeWidth={2.25} />
                    </span>
                    <p className="mt-4 text-bodysm text-ink-muted">
                      {item.lines[0]}
                      <br />
                      {item.lines[1]}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <img
              src="/login-bg.png"
              alt=""
              aria-hidden="true"
              draggable="false"
              className="hidden min-w-0 max-w-[500px] flex-1 select-none object-contain xl:block"
            />
          </div>
        </aside>

        <main className="m-auto w-full max-w-[640px] shrink-0 rounded-xl bg-surface p-8 shadow-card sm:px-14 sm:py-10 desktop:m-0 desktop:self-center">
          <BrandLogo size="xl" />

          <h1 className="mt-10 text-hero font-extrabold text-ink">Welcome back</h1>
          <p className="mt-3 max-w-sm text-section font-medium text-ink-muted">
            Sign in to your account and continue managing your tasks.
          </p>

          <form
            className="mt-10 space-y-6"
            onSubmit={(event) => {
              event.preventDefault();
              submit();
            }}
          >
            <LoginField
              name="email"
              type="email"
              label="Email"
              value={values.email}
              onChange={(value) => setField('email', value)}
              placeholder="you@company.com"
              error={errors.email}
              leading={<Mail size={19} />}
            />
            <LoginField
              name="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              value={values.password}
              onChange={(value) => setField('password', value)}
              placeholder="Your password"
              error={errors.password}
              leading={<Lock size={19} />}
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="shrink-0 rounded-full p-1 text-ink-muted hover:text-ink"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              }
            />

            {serverError ? (
              <p className="rounded-card bg-danger-soft px-4 py-3 text-sub text-danger">{serverError}</p>
            ) : null}

            <Button type="submit" fullWidth loading={isSubmitting} className="!mt-9 h-14 text-section">
              Continue
              <ArrowRight size={20} />
            </Button>
          </form>

          {showDemoAccounts ? (
            <section className="mt-9">
              <div className="flex items-center gap-4 text-caption text-ink-muted">
                <span className="h-px flex-1 bg-line" />
                Demo Credentials
                <span className="h-px flex-1 bg-line" />
              </div>

              <ul className="mt-5 space-y-1 rounded-md bg-primary-tint px-4 py-3">
                {DEMO_ACCOUNTS.map((account) => (
                  <li key={account.email}>
                    <button
                      type="button"
                      onClick={() => fill({ email: account.email, password: account.password })}
                      title={`Fill in the ${account.role} account`}
                      className="flex w-full items-center gap-4 rounded-sm py-1 text-left hover:bg-primary-soft/60"
                    >
                      <span className="w-20 text-sub font-semibold text-ink">{account.role}:</span>
                      <span className="ml-auto truncate font-mono text-caption text-ink">{account.email}</span>
                      <span className="w-24 text-right font-mono text-caption text-ink-muted">{account.password}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </main>
      </div>
    </div>
  );
}
