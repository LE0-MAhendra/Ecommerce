import { RootState } from "@/redux/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export interface LoggedUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface AuthState {
  loggeduser: LoggedUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  Gstate: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
const initialState = {
  loggeduser: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true,
} as AuthState;

// Check localStorage for existing tokens
const storedAccessToken =
  typeof window !== "undefined" ? localStorage.getItem("access") || null : null;
const storedRefreshToken =
  typeof window !== "undefined"
    ? localStorage.getItem("refresh") || null
    : null;

// Update initial state based on localStorage
if (storedAccessToken !== null && storedRefreshToken !== null) {
  initialState.accessToken = storedAccessToken;
  initialState.refreshToken = storedRefreshToken;
  initialState.isAuthenticated = true;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { refresh, access } = action.payload;
      state.accessToken = access;
      state.refreshToken = refresh;
      state.isAuthenticated = true;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.loggeduser = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action) => {
      state.loggeduser = null;
      const user = action.payload;
      state.loggeduser = user;
    },
    Glogin: (state, action) => {
      const { gstate, refresh, access } = action.payload;
      state.accessToken = access;
      state.refreshToken = refresh;
      state.Gstate = gstate;
      state.isAuthenticated = true;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      sessionStorage.setItem("State", gstate);
    },
  },
});
export const { setAuth, logout, setLoading, setUser, Glogin } =
  authSlice.actions;
export const UserAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const myToken = (state: RootState) => state.auth.accessToken;
export default authSlice.reducer;
export const loadingState = (state: RootState) => state.auth.isLoading;
