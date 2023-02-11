import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uploadProfileImages } from "../upload/uploadSlice";
import { deleteProfilePicture } from "../user/userSlice";

import authService from "./authService";

const userExist = localStorage.getItem("blog_central")
  ? JSON.parse(localStorage.getItem("blog_central"))
  : "";

const initialState = {
  currentUser: userExist ? userExist : null,
  status: userExist ? "loggedIn" : "idle",
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

export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    const response = await authService.logout();
    localStorage.setItem("blog_central", JSON.stringify(""));
    localStorage.removeItem("blog_central");
    return response.data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { profile, ...other } = action.payload;
        localStorage.setItem("blog_central", JSON.stringify(other));
        state.currentUser = other;
        state.error = null;
        state.status = "loggedIn";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
        state.currentUser = [];
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "loggedOut";
        state.currentUser = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
      })
      .addCase(uploadProfileImages.fulfilled, (state, action) => {
        state.currentUser.user.profilePic = action.payload.profilePic;
      })
      .addCase(deleteProfilePicture.fulfilled, (state, action) => {
        state.currentUser.user = action.payload;
      });
  },
});

export const selectUserError = (state) => state.auth.error;
export const selectUserStatus = (state) => state.auth.status;
export const selectCurrentUser = (state) => state.auth?.currentUser?.user;
export const selectCurrentUserId = (state) => state.auth.currentUser?.user?._id;

export default authSlice.reducer;
