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

export const getUserBlogs = createAsyncThunk(
  "blog/getUserBlogs",
  async (thunkAPI) => {
    try {
      const response = await blogServices.getUserBlogs();
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getBlogsByUserId = createAsyncThunk(
  "blog/getByUserId",
  async (userId, thunkAPI) => {
    try {
      const response = await blogServices.getUserBlogsByUserId(userId);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getAllBlogs = createAsyncThunk("blog/all", async (thunkAPI) => {
  try {
    const response = await blogServices.getAllBlogs();
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

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
        state.status = "added";
        console.log(action.payload);
        state.blogs.push(action.payload.data);
        state.error = null;
      })
      .addCase(addNewBlog.rejected, (state, action) => {
        state.status = "error";
        state.blogs = [];
        state.error = action.payload.message;
      })
      .addCase(getUserBlogs.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserBlogs.fulfilled, (state, action) => {
        state.status = "success";
        state.blogs = action.payload.blogs;
        state.error = null;
      })
      .addCase(getUserBlogs.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload.message;
        state.blogs = [];
      })
      .addCase(getBlogsByUserId.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getBlogsByUserId.fulfilled, (state, action) => {
        state.status = "success";
        state.blogs = action.payload.blogs;
        state.error = null;
      })
      .addCase(getBlogsByUserId.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload.message;
        state.blogs = [];
      })
      .addCase(getAllBlogs.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.status = "success";
        state.blogs = action.payload;
        state.error = null;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload.message;
        state.blogs = [];
      });
  },
});

export const selectBlogsStatus = (state) => state.blogs.status;
export const selectBlogsData = (state) => state.blogs.blogs;
export const selectBlogsError = (state) => state.blogs.error;

export default blogSlice.reducer;
