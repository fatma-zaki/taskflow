import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/shared/utils/cn.js';
import { useDismissable } from '@/shared/hooks/useDismissable.js';
import IconButton from './IconButton.jsx';

/** @type {Record<'sm' | 'md' | 'lg' | 'xl', string>} */
const SIZES = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

/**
 * Centred dialog — the web presentation of `Dialog`.
 *
 * @param {Object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {import('react').ReactNode} props.children
 * @param {string} [props.title]
 * @param {'sm' | 'md' | 'lg' | 'xl'} [props.size]
 * @param {string} [props.className]
 */
export default function Modal({ open, onClose, children, title, size = 'md', className }) {
  useDismissable({ open, onClose });

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 animate-fade-in bg-ink/40"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          'relative w-full animate-screen-in rounded-lg bg-surface shadow-raised',
          SIZES[size],
          className,
        )}
      >
        {title ? (
          <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
            <h2 className="text-section">{title}</h2>
            <IconButton label="Close" onClick={onClose}>
              <X size={20} />
            </IconButton>
          </div>
        ) : null}
        <div className="max-h-[75vh] overflow-y-auto px-6 py-5" data-scroll-area>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
