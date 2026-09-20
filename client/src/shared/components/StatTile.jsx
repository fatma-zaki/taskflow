import { Link } from 'react-router-dom';
import { cn } from '@/shared/utils/cn.js';
import IconBadge from './IconBadge.jsx';

/**
 * A compact statistic: small icon, value, label. Deliberately small — three of
 * these sit side by side on a 390px screen without becoming cards.
 *
 * @param {Object} props
 * @param {string} props.label
 * @param {number | string} props.value
 * @param {import('react').ReactElement} props.icon
 * @param {import('@/shared/theme/tones.js').Tone} [props.tone]
 * @param {boolean} [props.highlighted] Tints the tile — used for "today's focus" stat.
 * @param {string} [props.to]
 * @param {string} [props.className]
 */
export default function StatTile({ label, value, icon, tone = 'neutral', highlighted = false, to, className }) {
  const classes = cn(
    'flex flex-1 flex-col gap-2 rounded-card border p-3',
    highlighted ? 'border-primary/40 bg-primary-tint' : 'border-line bg-surface',
    to && 'press',
    className,
  );

  const content = (
    <>
      <IconBadge icon={icon} tone={tone} size="sm" />
      <span className="block text-title leading-none">{value}</span>
      <span className="block text-caption text-ink-muted">{label}</span>
    </>
  );

  return to ? (
    <Link to={to} className={classes}>
      {content}
    </Link>
  ) : (
    <div className={classes}>{content}</div>
  );
}
