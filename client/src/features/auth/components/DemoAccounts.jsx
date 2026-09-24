import { ShieldCheck, User, Users } from 'lucide-react';
import { cn } from '@/shared/utils/cn.js';

/** The accounts created by `npm run seed` in the server. */
export const DEMO_ACCOUNTS = Object.freeze([
  { role: 'Admin', email: 'admin@taskflow.com', password: 'Admin123', icon: ShieldCheck },
  { role: 'Manager', email: 'manager@taskflow.com', password: 'Manager123', icon: Users },
  { role: 'User', email: 'user@taskflow.com', password: 'User123', icon: User },
]);

/**
 * Anyone who can open the login page can read these, so they only show in local
 * development unless a build opts in with VITE_SHOW_DEMO_ACCOUNTS=true.
 */
export const showDemoAccounts =
  import.meta.env.DEV || import.meta.env.VITE_SHOW_DEMO_ACCOUNTS === 'true';

/**
 * Test accounts for the login screens. Choosing one fills the form.
 *
 * @param {Object} props
 * @param {(account: { email: string, password: string }) => void} props.onSelect
 * @param {string} [props.className]
 */
export default function DemoAccounts({ onSelect, className }) {
  if (!showDemoAccounts) return null;

  return (
    <section className={cn('rounded-card border border-dashed border-line bg-surface p-3', className)}>
      <p className="px-1 text-caption font-semibold uppercase tracking-wide text-ink-faint">
        Test accounts · tap to fill
      </p>
      <ul className="mt-2 space-y-1">
        {DEMO_ACCOUNTS.map((account) => (
          <li key={account.email}>
            <button
              type="button"
              onClick={() => onSelect({ email: account.email, password: account.password })}
              className="press flex w-full items-center gap-3 rounded-md px-2 py-2 text-left hover:bg-surface-muted active:bg-surface-muted"
            >
              <account.icon size={17} className="shrink-0 text-primary-strong" />
              <span className="min-w-0 flex-1">
                <span className="block text-bodysm font-semibold text-ink">{account.role}</span>
                <span className="block truncate text-sub text-ink-muted">
                  {account.email} · {account.password}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
