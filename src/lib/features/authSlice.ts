import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "@/lib/services/api/authApi";

interface User {
  id: string;
  phoneNumber: string;
  fullName?: string;
  email?: string;
  addresses: [];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean; // Track initial auth check
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start as loading
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },

    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },

    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },

  // Handle RTK Query responses automatically
  extraReducers: (builder) => {
    // When getCurrentUser succeeds
    builder.addMatcher(
      authApi.endpoints.getCurrentUser.matchFulfilled,
      (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isLoading = false;
      },
    );

    // When getCurrentUser fails (no valid session)
    builder.addMatcher(
      authApi.endpoints.getCurrentUser.matchRejected,
      (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      },
    );

    // When verifyOtp succeeds
    builder.addMatcher(
      authApi.endpoints.verifyOtp.matchFulfilled,
      (state, action) => {
        // state.user = action.payload.user;
        state.isAuthenticated = action.payload.success;
        state.isLoading = false;
      },
    );

    // When logout succeeds
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    });
  },
});

export const { setUser, clearUser, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;
