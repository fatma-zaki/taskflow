import { createPortal } from 'react-dom';
import { cn } from '@/shared/utils/cn.js';
import { useDismissable } from '@/shared/hooks/useDismissable.js';

/**
 * A modal sheet that rises from the bottom — the phone presentation of a
 * dialog. Use `Dialog` rather than this directly, so the web app gets a
 * centred window instead.
 *
 * @param {Object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {import('react').ReactNode} props.children
 * @param {string} [props.title]
 * @param {string} [props.className]
 */
export default function BottomSheet({ open, onClose, children, title, className }) {
  useDismissable({ open, onClose });

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 animate-fade-in bg-ink/30"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          'relative w-full max-w-app animate-sheet-in rounded-t-xl bg-surface pb-safe shadow-raised',
          className,
        )}
      >
        <div className="flex justify-center pt-3">
          <span aria-hidden="true" className="h-1 w-10 rounded-full bg-line-strong" />
        </div>
        {title ? <h2 className="px-screen pt-3 text-section">{title}</h2> : null}
        <div className="max-h-[70vh] overflow-y-auto pb-4" data-scroll-area>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
