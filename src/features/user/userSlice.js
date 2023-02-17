import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../auth/authSlice";
import userServices from "./userService";
import profileService from "./userService";

const initialState = {
  allUsers: {
    users: [],
    status: "",
    error: null,
  },
  user: {
    user: {},
    status: "",
    error: null,
  },
  profilePic: {
    status: "",
    error: null,
  },
  dashboard: {
    data: [],
    status: "",
    error: null,
  },
  profile: [],
  status: "idle",
  error: null,
};

export const updateProfile = createAsyncThunk(
  "profile/update",
  async (profileData, thunkAPI) => {
    try {
      const response = await profileService.updateProfile(profileData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getAllProfiles = createAsyncThunk(
  "profile/get-all",
  async (thunkAPI) => {
    try {
      const response = await profileService.getAllProfiles();
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "users/get-all",
  async (thunkAPI) => {
    try {
      const response = await userServices.getAllUsers();
      return response.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getUserProfileById = createAsyncThunk(
  "profile/get-by-id",
  async (userId, thunkAPI) => {
    try {
      const response = await profileService.getUserProfile(userId);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getDashboardData = createAsyncThunk(
  "admin/get-dashboard",
  async (_, thunkAPI) => {
    try {
      const response = await userServices.getDashboardData();
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateProfilePicture = createAsyncThunk(
  "user/update-profile-picture",
  async (data, thunkAPI) => {
    try {
      const { userId, fileToUpload } = data;
      const formData = new FormData();
      formData.append("images", fileToUpload);
      const response = await userServices.updateProfilePicture({
        formData,
        userId,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteProfilePicture = createAsyncThunk(
  "user/delete-profile-picture",
  async (userId, thunkAPI) => {
    try {
      const response = await userServices.deleteProfilePicture(userId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
      })
      .addCase(updateProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.error = null;
        state.status = "updated";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload.message;
        state.status = "error";
        state.profile = [];
      })
      .addCase(getAllProfiles.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllProfiles.fulfilled, (state, action) => {
        state.profile = [action.payload];
        state.error = null;
        state.status = "success";
      })
      .addCase(getAllProfiles.rejected, (state, action) => {
        state.error = action.payload.message;
        state.profile = [];
        state.status = "error";
      })
      .addCase(getAllUsers.pending, (state) => {
        state.allUsers.error = null;
        state.allUsers.status = "loading";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.allUsers.users = action.payload;
        state.allUsers.error = null;
        state.allUsers.status = "success";
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.allUsers.error = action.payload.message;
        state.allUsers.users = [];
        state.allUsers.status = "error";
      })
      .addCase(getDashboardData.pending, (state) => {
        state.dashboard.error = null;
        state.dashboard.status = "loading";
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.dashboard.data = action.payload;
        state.dashboard.error = null;
        state.dashboard.status = "success";
      })
      .addCase(getDashboardData.rejected, (state, action) => {
        state.dashboard.error = action.payload.message;
        state.dashboard.data = [];
        state.dashboard.status = "error";
      })
      .addCase(getUserProfileById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserProfileById.fulfilled, (state, action) => {
        const { user, ...other } = action.payload || {};
        state.profile = other;
        state.error = null;
        state.status = "fetched";
      })
      .addCase(getUserProfileById.rejected, (state, action) => {
        state.error = action.payload.message;
        state.profile = [];
        state.status = "error";
      })
      .addCase(updateProfilePicture.pending, (state) => {
        state.profilePic.error = null;
        state.profilePic.status = "updating";
      })
      .addCase(updateProfilePicture.fulfilled, (state) => {
        state.profilePic.error = null;
        state.profilePic.status = "updated";
      })
      .addCase(updateProfilePicture.rejected, (state, action) => {
        state.profilePic.error = action.payload.message;
        state.profilePic.status = "rejected";
      })
      .addCase(deleteProfilePicture.pending, (state) => {
        state.profilePic.error = null;
        state.profilePic.status = "deleting";
      })
      .addCase(deleteProfilePicture.fulfilled, (state, action) => {
        state.profilePic.error = null;
        state.profilePic.status = "deleted";
      })
      .addCase(deleteProfilePicture.rejected, (state, action) => {
        state.profilePic.error = action.payload.message;
        state.profilePic.status = "rejected";
      });
  },
});

export const selectProfileError = (state) => state.user.error;
export const selectProfileData = (state) => state.user.profile;
export const selectProfileStatus = (state) => state.user.status;
export const selectProfilePicStatus = (state) => state.user.profilePic.status;
export const selectProfilePicError = (state) => state.user.profilePic.error;

export const selectAllUsers = (state) => state.user.allUsers;

export const selectDashboardData = (state) => state.user.dashboard;

export default profileSlice.reducer;
