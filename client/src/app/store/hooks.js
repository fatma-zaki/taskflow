import { useDispatch, useSelector } from 'react-redux';

/**
 * @returns {import('./index.js').AppDispatch}
 */
export const useAppDispatch = () => useDispatch();

/**
 * @template T
 * @param {(state: import('./index.js').RootState) => T} selector
 * @returns {T}
 */
export const useAppSelector = (selector) => useSelector(selector);
