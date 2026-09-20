import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/shared/utils/cn.js';

/**
 * Inline "go somewhere" link with a trailing arrow — section actions and
 * end-of-screen affordances both use it.
 *
 * @param {Object} props
 * @param {string} props.to
 * @param {import('react').ReactNode} props.children
 * @param {'muted' | 'strong'} [props.emphasis]
 * @param {string} [props.className]
 */
export default function TextLink({ to, children, emphasis = 'muted', className }) {
  return (
    <Link
      to={to}
      className={cn(
        'press-sm inline-flex items-center gap-1 text-sub font-semibold',
        emphasis === 'strong' ? 'text-ink' : 'text-ink-muted',
        className,
      )}
    >
      {children}
      <ArrowRight size={14} strokeWidth={2.25} />
    </Link>
  );
}
