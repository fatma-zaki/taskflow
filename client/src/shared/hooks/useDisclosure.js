import { useCallback, useState } from 'react';

/**
 * Open/close state for sheets, pickers and dialogs.
 *
 * @param {boolean} [initial]
 * @returns {{ open: boolean, show: () => void, hide: () => void, toggle: () => void }}
 */
export function useDisclosure(initial = false) {
  const [open, setOpen] = useState(initial);

  const show = useCallback(() => setOpen(true), []);
  const hide = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((value) => !value), []);

  return { open, show, hide, toggle };
}

export default useDisclosure;
