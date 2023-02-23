import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import authService from "./authService";
import { deleteProfilePicture, updateProfilePicture } from "../user/userSlice";

const userExist = localStorage.getItem(
  import.meta.env.MODE === "production" ? "blog_central" : "blog_central_test"
)
  ? JSON.parse(
      localStorage.getItem(
        import.meta.env.MODE === "production"
          ? "blog_central"
          : "blog_central_test"
      )
    )
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

export const deleteUser = createAsyncThunk(
  "auth/reset-password",
  async (userId, thunkAPI) => {
    try {
      const response = await authService.deleteUser(userId);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const handleRefreshToken = createAsyncThunk(
  "auth/refresh-token",
  async (token, thunkAPI) => {
    try {
      const response = await authService.handleRefreshToken(token);
      return response.data;
    } catch (err) {
      console.log(err.response);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    const response = await authService.logout();
    localStorage.setItem(
      import.meta.env.MODE === "production"
        ? "blog_central"
        : "blog_central_test",
      JSON.stringify("")
    );
    localStorage.removeItem(
      import.meta.env.MODE === "production"
        ? "blog_central"
        : "blog_central_test"
    );
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
        localStorage.setItem(
          import.meta.env.MODE === "production"
            ? "blog_central"
            : "blog_central_test",
          JSON.stringify(other)
        );
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
        state.status = "registering";
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
      .addCase(handleRefreshToken.pending, (state) => {
        state.status = "authenticating";
        state.error = null;
        state.currentUser = null;
      })
      .addCase(handleRefreshToken.fulfilled, (state, action) => {
        console.log(action.payload);
        // const { profile, ...other } = action.payload;
        // localStorage.setItem(
        //   import.meta.env.MODE === "production"
        //     ? "blog_central"
        //     : "blog_central_test",
        //   JSON.stringify(other)
        // );
        // state.currentUser = other;
        // state.error = null;
        // state.status = "loggedIn";
      })
      .addCase(handleRefreshToken.rejected, (state, action) => {
        console.log(action.payload);
        state.status = "not-authenticated";
        // state.error = action.payload.message;
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
      .addCase(deleteUser.pending, (state) => {
        state.status = "deleting";
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "deleted";
        state.error = null;
        state.currentUser = {
          user: { profilePic: {} },
        };
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
      })
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
