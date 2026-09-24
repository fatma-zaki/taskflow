import { useEffect } from 'react';

/**
 * Shared behaviour for anything that overlays the page: Escape closes it and
 * the page behind it stops scrolling while it is open.
 *
 * @param {{ open: boolean, onClose: () => void }} options
 * @returns {void}
 */
export function useDismissable({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;

    /** @param {KeyboardEvent} event */
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);
}

export default useDismissable;
