import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteProfilePicture,
  getAProfile,
  updateProfilePicture,
} from "../user/userSlice";

import authService from "./authService";

const userExist = localStorage.getItem("blog_central")
  ? JSON.parse(localStorage.getItem("blog_central"))
  : "";

const initialState = {
  currentUser: userExist
    ? userExist
    : {
        user: { profilePic: {} },
      },
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

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.register(userData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgot-password",
  async (email, thunkAPI) => {
    try {
      const response = await authService.forgotPassword(email);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async (data, thunkAPI) => {
    try {
      const response = await authService.resetPassword(data);
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
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.currentUser = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.currentUser = null;
        state.error = null;
        state.status = "registered";
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
        state.currentUser = null;
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "loggedOut";
        state.error = null;
        state.currentUser = {
          user: { profilePic: {} },
        };
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
      })
      // .addCase(getAProfile.fulfilled, (state, action) => {
      //   // console.log(action.payload);
      //   // console.log(state.curre)
      //   // state.currentUser.user.profilePic =
      //   //   action?.payload?.user?.profilePic || {};

      //   // if(state.currentUser.user)

      //   // console.log({ data: action.payload });

      //   if (action.payload.profileNull) {
      //     console.log("profile not available");
      //     console.log(action.payload);
      //     const { profileNull, ...other } = action.payload;
      //     state.currentUser.user = other;
      //   }

      //   if (!action.payload.profileNull) {
      //     console.log("profiel available");
      //     state.currentUser.user.profilePic =
      //       action.payload.profile.user.profilePic;
      //   }

      //   // if (state?.currentUser?._id) {
      //   //   state.currentUser.user.profilePic =
      //   //   action?.payload?.user?.profilePic
      //   // } else {
      //   //   state.currentUser = {
      //   //     user: {
      //   //       profilePic:
      //   //     }
      //   //   }
      //   // }

      //   // if(!state?.currentUser?.user) state.curr

      //   // console.log(!state.currentUser?.user);
      // })
      .addCase(updateProfilePicture.fulfilled, (state, action) => {
        state.currentUser.user.profilePic = action.payload.profilePic;
      })
      .addCase(deleteProfilePicture.fulfilled, (state, action) => {
        state.currentUser.user.profilePic = action.payload.profilePic;
      });
  },
});

export const selectUserError = (state) => state.auth.error;
export const selectUserStatus = (state) => state.auth.status;
export const selectCurrentUser = (state) => state.auth?.currentUser?.user;
export const selectCurrentUserId = (state) => state.auth.currentUser?.user?._id;
export const selectCurrentUserToken = (state) =>
  state?.auth?.currentUser?.token;

export default authSlice.reducer;
