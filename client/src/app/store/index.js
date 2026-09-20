import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/store/authSlice.js';

/**
 * Redux holds session state only; server state lives in React Query.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

/** @typedef {ReturnType<typeof store.getState>} RootState */
/** @typedef {typeof store.dispatch} AppDispatch */
