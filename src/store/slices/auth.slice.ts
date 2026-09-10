import { clearSession, loadSession, saveSession } from "@/lib/storage";
import type { AuthState, LoginData } from "@/types/Authentication";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const persisted = loadSession();

const initialState: AuthState = {
  ...persisted,
  isAuthenticated: !!persisted.token,
  fullName: persisted.fullName ?? null,
  userId: persisted.userId ?? null,
};

interface SetCredentialsPayload extends LoginData {
  rememberMe: boolean;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, { payload }: PayloadAction<SetCredentialsPayload>) {
      const { rememberMe, ...data } = payload;

      state.token = data.token;
      state.refreshToken = data.refreshToken;
      state.tokenExpiration = data.tokenExpiration;
      state.username = data.username;
      state.fullName = data.fullName;
      state.role = data.role;
      state.userId = data.userId;
      state.isAuthenticated = true;
      

      // rememberMe=true  → localStorage  (survives browser close)
      // rememberMe=false → sessionStorage (cleared on browser close)
      saveSession(data, rememberMe);
    },

    clearCredentials(state) {
      state.token = null;
      state.refreshToken = null;
      state.tokenExpiration = null;
      state.username = null;
      state.role = null;
      state.fullName = null;
      state. userId = null;
      state.isAuthenticated = false;

      clearSession();
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;

// ─── SELECTORS ───────────────────────────────────────────────────────────────
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;

export const selectCurrentUserToken = (state: { auth: AuthState }) =>
  state.auth.token;

export const selectCurrentUser = (state: { auth: AuthState }) => ({
  username: state.auth.username,
  roles: state.auth.role,
});

export const selectHasRole =
  (role: string) => (state: { auth: AuthState }) =>
    state.auth.role?.includes(role);

  export const selectFullName = (state: { auth: AuthState }) => state.auth.fullName;