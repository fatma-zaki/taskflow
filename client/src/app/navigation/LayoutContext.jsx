import { createContext, useContext } from 'react';

/**
 * Tells screens whether the bottom navigation is on screen, so pinned elements
 * (screen footers, floating buttons) can sit above it instead of under it.
 */
const LayoutContext = createContext({ hasBottomNav: false });

/**
 * @param {Object} props
 * @param {boolean} props.hasBottomNav
 * @param {import('react').ReactNode} props.children
 */
export function LayoutProvider({ hasBottomNav, children }) {
  return <LayoutContext.Provider value={{ hasBottomNav }}>{children}</LayoutContext.Provider>;
}

/** @returns {{ hasBottomNav: boolean }} */
export const useLayout = () => useContext(LayoutContext);

export default LayoutContext;
