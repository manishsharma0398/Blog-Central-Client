import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogServices from "./blogService";

const initialState = {
  blogs: [],
  status: "idle",
  error: null,
};

export const addNewBlog = createAsyncThunk(
  "blog/add",
  async (newBlogData, thunkAPI) => {
    try {
      const response = await blogServices.writeNewBlog(newBlogData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getUserBlog = createAsyncThunk(
  "blog/getByUserId",
  async (userId, thunkAPI) => {
    try {
      const response = await blogServices.getUserBlogs(userId);
      console.log(response);
      return { ...response.data };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewBlog.pending, (state) => {
        state.status = "loading";
        state.blogs = [];
        state.error = null;
      })
      .addCase(addNewBlog.fulfilled, (state, action) => {
        state.status = "success";
        console.log(action.payload);
        state.blogs.push(action.payload.data);
        state.error = null;
      })
      .addCase(addNewBlog.rejected, (state, action) => {
        console.log(action.payload);
        state.status = "error";
        state.blogs = [];
        console.log(action.payload);
        // state.error = null
      })
      .addCase(getUserBlog.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserBlog.fulfilled, (state, action) => {
        state.status = "success";
        console.log(action.payload);
        state.blogs = action.payload.blogs;
        state.error = null;
      })
      .addCase(getUserBlog.rejected, (state, action) => {
        console.log(action.payload);
        state.status = "error";
        // state.blogs = [];
        console.log(action.payload);
        // state.error = null
      });
  },
});

export const selectAllUserBlogsStatus = (state) => state.blogs.status;

export const selectAllUserBlogs = (state) => state.blogs.blogs;

export default blogSlice.reducer;
