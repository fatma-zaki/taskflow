import { useEffect, useRef, useState } from 'react';
import { cn } from '@/shared/utils/cn.js';

/**
 * A popover anchored to its trigger — the notification bell and the account
 * menu in the top bar. Closes on outside click and on Escape.
 *
 * @param {Object} props
 * @param {(props: { open: boolean, toggle: () => void }) => import('react').ReactNode} props.trigger
 * @param {import('react').ReactNode} props.children
 * @param {'left' | 'right'} [props.align]
 * @param {string} [props.panelClassName]
 */
export default function MenuDropdown({ trigger, children, align = 'right', panelClassName }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(/** @type {HTMLDivElement | null} */ (null));

  useEffect(() => {
    if (!open) return undefined;

    /** @param {MouseEvent} event */
    const onPointerDown = (event) => {
      if (!containerRef.current?.contains(/** @type {Node} */ (event.target))) setOpen(false);
    };
    /** @param {KeyboardEvent} event */
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      {trigger({ open, toggle: () => setOpen((value) => !value) })}

      {open ? (
        <div
          className={cn(
            'absolute z-40 mt-2 animate-fade-in overflow-hidden rounded-card border border-line bg-surface shadow-raised',
            align === 'right' ? 'right-0' : 'left-0',
            panelClassName,
          )}
          onClick={() => setOpen(false)}
          role="presentation"
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
