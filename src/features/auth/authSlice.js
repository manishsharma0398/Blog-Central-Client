import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import authService from "./authService";

const initialState = {
  currentUser: {},
  // currentUser: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (loginData, thunkAPI) => {
    try {
      const response = await authService.login(loginData);
      return { ...response.data };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.currentUser = null;
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = null;
    },
    getUserDataFromLocalStorage: (state) => {
      if (localStorage.getItem("blog_central")) {
        const userData = JSON.parse(localStorage.getItem("blog_central"));
        state.isLoading = false;
        state.isSuccess = true;
        state.currentUser = userData;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentUser = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.currentUser = null;
        state.message = action.payload.data.message;
      });
  },
});

export const selectCurrentUser = (state) => state.user.currentUser;
export const getAuthDetails = (state) => state.user;

export const { reset, getUserDataFromLocalStorage } = authSlice.actions;

export default authSlice.reducer;
