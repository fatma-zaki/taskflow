import { createContext, useContext, useMemo } from 'react';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery.js';
import { breakpoints } from '@/shared/theme/tokens.js';

/**
 * TaskFlow ships two interfaces from one codebase: phone screens and the web
 * app. The platform is decided by viewport width and nothing else, so a link
 * opens the right interface wherever it is pasted and resizing switches live.
 *
 * @typedef {'mobile' | 'desktop'} Platform
 */

const PlatformContext = createContext(/** @type {{ platform: Platform, isDesktop: boolean }} */ ({
  platform: 'mobile',
  isDesktop: false,
}));

/**
 * @param {Object} props
 * @param {import('react').ReactNode} props.children
 */
export function PlatformProvider({ children }) {
  const isDesktop = useMediaQuery(`(min-width: ${breakpoints.desktop})`);

  const value = useMemo(
    () => ({ platform: /** @type {Platform} */ (isDesktop ? 'desktop' : 'mobile'), isDesktop }),
    [isDesktop],
  );

  return <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>;
}

/** @returns {{ platform: Platform, isDesktop: boolean }} */
export const usePlatform = () => useContext(PlatformContext);

export default PlatformContext;
