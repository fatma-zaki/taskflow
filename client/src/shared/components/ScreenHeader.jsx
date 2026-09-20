import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/shared/utils/cn.js';
import IconButton from './IconButton.jsx';

/**
 * Sticky screen header: optional back affordance, centered or leading title,
 * and a slot for one or two actions.
 *
 * @param {Object} props
 * @param {string} [props.title]
 * @param {boolean} [props.showBack]
 * @param {string} [props.backTo] Navigates here instead of going back in history.
 * @param {import('react').ReactNode} [props.leading] Replaces the back button (e.g. the logo).
 * @param {import('react').ReactNode} [props.action] Right-hand slot.
 * @param {'center' | 'start'} [props.align]
 * @param {boolean} [props.transparent] Blends into the page instead of sitting on a surface.
 * @param {string} [props.className]
 */
export default function ScreenHeader({
  title,
  showBack = false,
  backTo,
  leading,
  action,
  align = 'center',
  transparent = false,
  className,
}) {
  const navigate = useNavigate();
  const goBack = () => (backTo ? navigate(backTo) : navigate(-1));

  return (
    <header
      className={cn(
        'sticky top-0 z-20 px-screen pt-safe',
        transparent ? 'bg-app' : 'bg-app/95 backdrop-blur-sm',
        className,
      )}
    >
      <div className="flex h-header items-center gap-2">
        <div className="flex min-w-touch shrink-0 items-center">
          {leading ??
            (showBack ? (
              <IconButton label="Go back" onClick={goBack}>
                <ChevronLeft size={24} strokeWidth={2.25} />
              </IconButton>
            ) : null)}
        </div>

        {title ? (
          <h1
            className={cn(
              'flex-1 truncate text-title',
              align === 'center' ? 'text-center' : 'text-left',
            )}
          >
            {title}
          </h1>
        ) : (
          <div className="flex-1" />
        )}

        <div className="flex min-w-touch shrink-0 items-center justify-end gap-1">{action}</div>
      </div>
    </header>
  );
}
