import { QueryClient } from '@tanstack/react-query';

/**
 * Query defaults for a mobile client: data stays fresh for a short while so
 * moving between tabs does not refetch, and a failed request is retried once.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30_000,
    },
  },
});

export default queryClient;
