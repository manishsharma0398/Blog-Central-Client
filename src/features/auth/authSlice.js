import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import authService from "./authService";

const initialState = {
  // currentUser: {},
  currentUser: JSON.parse(localStorage.getItem("blog_central")),
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (loginData, thunkAPI) => {
    try {
      const response = await authService.login(loginData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.currentUser = [];
      state.status = "idle";
      state.error = null;
    },
    getUserDataFromLocalStorage: (state) => {
      if (localStorage.getItem("blog_central")) {
        const userData = JSON.parse(localStorage.getItem("blog_central"));
        state.status = "success";
        state.error = null;
        state.currentUser = userData;
      }
    },
    logout: () => {
      localStorage.setItem("blog_central", JSON.stringify(""));
      localStorage.removeItem("blog_central");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "loggedIn";
        state.error = null;
        state.currentUser = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
        state.currentUser = [];
      });
  },
});

export const selectCurrentUser = (state) => state.user?.currentUser?.user;
export const selectCurrentUserProfile = (state) =>
  state.user.currentUser.profile;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;
export const selectCurrentUserId = (state) => state.user.currentUser.user.id;

export const { reset, getUserDataFromLocalStorage, logout } = authSlice.actions;

export default authSlice.reducer;
