import uploadServices from "./uploadService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: [],
  status: "idle",
  error: null,
};

export const uploadBlogImages = createAsyncThunk(
  "upload/blog-image",
  async (images, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        formData.append("images", image);
      }

      const response = await uploadServices.uploadBlogImages(formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const uploadPlaceholderImage = createAsyncThunk(
  "upload/placeholder-image",
  async (images, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        formData.append("images", image);
      }

      const response = await uploadServices.uploadBlogImages(formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const uploadProfileImages = createAsyncThunk(
  "upload/profile-image",
  async (images, thunkAPI) => {
    try {
      const formData = new FormData();
      console.log(images);
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        formData.append("images", image);
      }

      const response = await uploadServices.uploadProfileImages(formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteImage = createAsyncThunk(
  "upload/delete-image",
  async (imageId, thunkAPI) => {
    try {
      const response = await uploadServices.deleteImages(imageId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: () => {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadBlogImages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadBlogImages.fulfilled, (state, action) => {
        state.images = action.payload;
        state.error = null;
        state.status = "uploaded";
      })
      .addCase(uploadBlogImages.rejected, (state, action) => {
        console.log(action.payload);
        state.status = "rejected";
        state.error = action.payload.message;
      })
      .addCase(uploadPlaceholderImage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadPlaceholderImage.fulfilled, (state, action) => {
        state.error = null;
        state.status = "placeholder image uploaded";
      })
      .addCase(uploadPlaceholderImage.rejected, (state, action) => {
        console.log(action.payload);
        state.status = "rejected";
        state.error = action.payload.message;
      })
      .addCase(deleteImage.pending, (state) => {
        state.status = "deleting";
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.images = [];
        state.error = null;
        state.status = "deleted";
      })
      .addCase(deleteImage.rejected, (state, action) => {
        console.log(action.payload);
        state.error = action.payload.message;
        state.images = [];
        state.status = "rejected";
      });
  },
});

export const selectUploadImagesData = (state) => state.upload.images;
export const selectUploadImagesError = (state) => state.upload.error;
export const selectUploadImagesStatus = (state) => state.upload.status;

export default uploadSlice.reducer;
