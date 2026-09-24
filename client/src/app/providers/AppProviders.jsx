import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { registerUnauthorizedHandler } from '@/services/api';
import { initAuth, logout } from '@/features/auth';
import { PlatformProvider } from '../platform/PlatformProvider.jsx';
import { store } from '../store/index.js';
import { queryClient } from './queryClient.js';
import { toastOptions } from './toastOptions.js';

/** An expired session clears Redux and lands the person on sign-in. */
registerUnauthorizedHandler(() => {
  store.dispatch(logout());
});

/**
 * Wires every cross-cutting concern in one place: store, server cache, router
 * and toasts.
 *
 * @param {Object} props
 * @param {import('react').ReactNode} props.children
 */
export default function AppProviders({ children }) {
  useEffect(() => {
    store.dispatch(initAuth());
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PlatformProvider>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            {children}
            <Toaster {...toastOptions} />
          </BrowserRouter>
        </PlatformProvider>
      </QueryClientProvider>
    </Provider>
  );
}
