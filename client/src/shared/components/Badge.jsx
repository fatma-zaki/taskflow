import { cn } from '@/shared/utils/cn.js';
import { toneForeground, toneSurface } from '@/shared/theme/tones.js';

/**
 * Small status pill.
 *
 * @param {Object} props
 * @param {import('react').ReactNode} props.children
 * @param {import('@/shared/theme/tones.js').Tone} [props.tone]
 * @param {import('react').ReactNode} [props.icon]
 * @param {string} [props.className]
 */
export default function Badge({ children, tone = 'neutral', icon, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-caption font-semibold',
        toneSurface[tone],
        toneForeground[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
