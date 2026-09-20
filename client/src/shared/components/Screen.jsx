import { useLayout } from '@/app/navigation/LayoutContext.jsx';
import { cn } from '@/shared/utils/cn.js';

/**
 * The page container every screen renders into: horizontal screen padding,
 * room for the fixed bottom navigation, and the shared enter transition.
 *
 * @param {Object} props
 * @param {import('react').ReactNode} props.children
 * @param {import('react').ReactNode} [props.header] Rendered edge-to-edge above the body.
 * @param {import('react').ReactNode} [props.footer] Pinned action area, e.g. a submit button.
 * @param {boolean} [props.padded] Set false for edge-to-edge content.
 * @param {string} [props.className]
 */
export default function Screen({ children, header, footer, padded = true, className }) {
  const { hasBottomNav } = useLayout();

  return (
    <div className="min-h-full">
      {header}
      {/* Only the body animates in: a transform on the wrapper would break the sticky header. */}
      <div className={cn('animate-screen-in', padded && 'px-screen', footer ? 'pb-28' : 'pb-8', className)}>
        {children}
      </div>

      {footer ? (
        <div
          className={cn(
            'fixed inset-x-0 z-30 mx-auto w-full max-w-app border-t border-line bg-surface px-screen pt-3',
            hasBottomNav ? 'bottom-nav-safe' : 'bottom-0 pb-safe',
          )}
        >
          <div className="pb-3">{footer}</div>
        </div>
      ) : null}
    </div>
  );
}
