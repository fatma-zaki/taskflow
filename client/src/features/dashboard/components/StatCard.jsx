import { Link } from 'react-router-dom';
import { cn } from '@/shared/utils/cn.js';
import { IconBadge } from '@/shared/components';

/**
 * A headline number on the web dashboard. The phone screens use `StatTile`,
 * which is the same idea at a size that fits three across a 390px screen.
 *
 * @param {Object} props
 * @param {string} props.label
 * @param {number | string} props.value
 * @param {import('react').ReactElement} props.icon
 * @param {import('@/shared/theme/tones.js').Tone} [props.tone]
 * @param {string} [props.hint]
 * @param {string} [props.to]
 * @param {string} [props.className]
 */
export default function StatCard({ label, value, icon, tone = 'neutral', hint, to, className }) {
  const content = (
    <>
      <IconBadge icon={icon} tone={tone} size="lg" />
      <div className="min-w-0">
        <p className="text-display leading-none">{value}</p>
        <p className="mt-1.5 text-sub font-semibold text-ink">{label}</p>
        {hint ? <p className="mt-0.5 text-caption text-ink-muted">{hint}</p> : null}
      </div>
    </>
  );

  const classes = cn(
    'flex items-center gap-4 rounded-card border border-line bg-surface p-5',
    to && 'transition-colors duration-fast hover:border-line-strong hover:bg-surface-muted/50',
    className,
  );

  return to ? (
    <Link to={to} className={classes}>
      {content}
    </Link>
  ) : (
    <div className={classes}>{content}</div>
  );
}
