import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authApi, apiErrorMessage, STORAGE_KEYS } from '@/services/api';

/**
 * @typedef {import('@/shared/types').User} User
 *
 * @typedef {Object} AuthState
 * @property {User | null} user
 * @property {boolean} loading
 * @property {string | null} error
 */

/** @type {AuthState} */
const initialState = {
  user: null,
  loading: true,
  error: null,
};

/** Restores the session from storage and re-validates it against the API. */
export const initAuth = createAsyncThunk('auth/init', async () => {
  const token = localStorage.getItem(STORAGE_KEYS.token);
  if (!token) return null;

  try {
    const { user } = await authApi.me();
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
    return user;
  } catch {
    localStorage.removeItem(STORAGE_KEYS.token);
    localStorage.removeItem(STORAGE_KEYS.user);
    return null;
  }
});

export const login = createAsyncThunk(
  'auth/login',
  /**
   * @param {{ email: string, password: string }} credentials
   * @param {{ rejectWithValue: (value: string) => unknown }} thunkApi
   */
  async (credentials, { rejectWithValue }) => {
    try {
      const { token, user } = await authApi.login(credentials);
      localStorage.setItem(STORAGE_KEYS.token, token);
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
      return user;
    } catch (error) {
      return rejectWithValue(apiErrorMessage(error, 'Login failed'));
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem(STORAGE_KEYS.token);
      localStorage.removeItem(STORAGE_KEYS.user);
    },
    clearError: (state) => {
      state.error = null;
    },
    /** @param {{ payload: User }} action */
    userUpdated: (state, action) => {
      if (!action.payload) return;
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(state.user));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(initAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(initAuth.rejected, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = /** @type {string} */ (action.payload) ?? 'Login failed';
      });
  },
});

export const { logout, clearError, userUpdated } = authSlice.actions;

/** @typedef {{ auth: AuthState }} RootStateWithAuth */

/** @param {RootStateWithAuth} state */
export const selectUser = (state) => state.auth.user;
/** @param {RootStateWithAuth} state */
export const selectAuthLoading = (state) => state.auth.loading;
/** @param {RootStateWithAuth} state */
export const selectAuthError = (state) => state.auth.error;
/** @param {RootStateWithAuth} state */
export const selectIsAuthenticated = (state) => Boolean(state.auth.user);
/** @param {RootStateWithAuth} state */
export const selectIsAdmin = (state) => state.auth.user?.role === 'admin';
/** Managers and admins share the same elevated permissions. @param {RootStateWithAuth} state */
export const selectIsManager = (state) =>
  state.auth.user?.role === 'manager' || state.auth.user?.role === 'admin';

export default authSlice.reducer;
