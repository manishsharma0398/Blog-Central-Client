import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../auth/authSlice";
import userServices from "./userService";
import profileService from "./userService";

const initialState = {
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
      .addCase(getUserProfileById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserProfileById.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.error = null;
        state.status = "fetched";
      })
      .addCase(getUserProfileById.rejected, (state, action) => {
        state.error = action.payload.message;
        state.profile = [];
        state.status = "error";
      })
      .addCase(deleteProfilePicture.pending, (state) => {
        state.status = "deleting";
      })
      .addCase(deleteProfilePicture.fulfilled, (state, action) => {
        state.error = null;
        state.status = "deleted";
      })
      .addCase(deleteProfilePicture.rejected, (state, action) => {
        state.error = action.payload.message;
        state.status = "rejected";
      });
  },
});

export const selectProfileError = (state) => state.user.error;
export const selectProfileData = (state) => state.user.profile;
export const selectProfileStatus = (state) => state.user.status;

export default profileSlice.reducer;