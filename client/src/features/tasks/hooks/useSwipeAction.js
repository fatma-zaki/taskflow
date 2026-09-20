import { useRef, useState } from 'react';

const ACTIVATION_DISTANCE = 72;
const MAX_DRAG = 96;
const DIRECTION_LOCK = 12;

/**
 * Horizontal swipe gesture for list rows.
 *
 * A row can be dragged sideways; releasing past the activation distance runs
 * the action, anything less springs back. Vertical scrolling wins whenever the
 * gesture starts out mostly vertical, so the list still scrolls normally, and
 * the click that follows a swipe is swallowed so the row does not also open.
 *
 * @param {Object} options
 * @param {() => void} options.onActivate
 * @param {boolean} [options.enabled]
 * @returns {{
 *   offset: number,
 *   swiping: boolean,
 *   handlers: {
 *     onTouchStart: (event: import('react').TouchEvent) => void,
 *     onTouchMove: (event: import('react').TouchEvent) => void,
 *     onTouchEnd: () => void,
 *     onClickCapture: (event: import('react').MouseEvent) => void,
 *   },
 * }}
 */
export function useSwipeAction({ onActivate, enabled = true }) {
  const [offset, setOffset] = useState(0);
  const [swiping, setSwiping] = useState(false);
  const start = useRef({ x: 0, y: 0 });
  const axis = useRef(/** @type {'none' | 'x' | 'y'} */ ('none'));
  const swallowNextClick = useRef(false);

  return {
    offset,
    swiping,
    handlers: {
      onTouchStart: (event) => {
        if (!enabled) return;
        const touch = event.touches[0];
        start.current = { x: touch.clientX, y: touch.clientY };
        axis.current = 'none';
      },
      onTouchMove: (event) => {
        if (!enabled) return;
        const touch = event.touches[0];
        const deltaX = touch.clientX - start.current.x;
        const deltaY = touch.clientY - start.current.y;

        if (axis.current === 'none') {
          if (Math.abs(deltaX) < DIRECTION_LOCK && Math.abs(deltaY) < DIRECTION_LOCK) return;
          axis.current = Math.abs(deltaX) > Math.abs(deltaY) ? 'x' : 'y';
        }
        if (axis.current !== 'x') return;

        setSwiping(true);
        swallowNextClick.current = true;
        setOffset(Math.max(-MAX_DRAG, Math.min(MAX_DRAG, deltaX)));
      },
      onTouchEnd: () => {
        if (!enabled) return;
        if (Math.abs(offset) >= ACTIVATION_DISTANCE) onActivate();
        setOffset(0);
        setSwiping(false);
        axis.current = 'none';
      },
      onClickCapture: (event) => {
        if (!swallowNextClick.current) return;
        swallowNextClick.current = false;
        event.preventDefault();
        event.stopPropagation();
      },
    },
  };
}

export default useSwipeAction;
