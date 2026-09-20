import { useEffect, useState } from 'react';

/**
 * Delays propagating a fast-changing value — used so typing in search does not
 * fire a request per keystroke.
 *
 * @template T
 * @param {T} value
 * @param {number} [delay] milliseconds
 * @returns {T}
 */
export function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export default useDebouncedValue;
