import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUser,
  loginUser,
  registerUser,
} from "./userThunk";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  success: null,
  posts:null
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.success = null;
      state.error = null;
      state.posts=null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = action.payload.loggedIn;
        state.user = action.payload.user || null;
        state.posts = action.payload.posts || null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false; 
        state.error = action.payload || "Error fetching user";
      })


      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user || null;
        state.posts = action.payload.posts || null;
        state.success = action.payload.message || "Logged in successfully!";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error logging in";
      })

      // Register User
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message || "Registration successful!";
        state.isAuthenticated = true; 
        state.user = action.payload.user || null;
        state.posts = action.payload.posts || null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error registering user";
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
