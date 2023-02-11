import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogServices from "./blogService";

const initialState = {
  blogs: [],
  blog: null,
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

export const getABlog = createAsyncThunk(
  "blog/getABlog",
  async (blogId, thunkAPI) => {
    try {
      const response = await blogServices.getABlog(blogId);
      return response.data;
    } catch (err) {
      console.log(err.response);
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

export const updateBlog = createAsyncThunk(
  "blog/update",
  async (updtData, thunkAPI) => {
    try {
      const response = await blogServices.updateBlog(updtData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blog/delete",
  async (blogId, thunkAPI) => {
    try {
      const response = await blogServices.deleteBlog(blogId);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogStatus(state, action) {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewBlog.pending, (state) => {
        state.status = "loading";
        state.blogs = [];
        state.error = null;
      })
      .addCase(addNewBlog.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.blogs = [action.payload];
        state.error = null;
        state.status = "added";
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
        state.blogs = action.payload.blogs;
        state.error = null;
        state.status = "success";
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
        state.blogs = action.payload.blogs;
        state.error = null;
        state.status = "success";
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
        state.blogs = action.payload;
        state.error = null;
        state.status = "success";
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload.message;
        state.blogs = [];
      })
      .addCase(getABlog.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.blog = null;
      })
      .addCase(getABlog.fulfilled, (state, action) => {
        state.blog = action.payload;
        state.error = null;
        state.status = "success";
      })
      .addCase(getABlog.rejected, (state, action) => {
        console.log(action.payload);
        state.status = "error";
        state.error = action.payload.message;
        state.blog = null;
      })
      .addCase(updateBlog.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.blogs = [action.payload];
        state.error = null;
        state.status = "updated";
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.error = action.payload.message;
        state.status = "error";
        state.blogs = [];
      })
      .addCase(deleteBlog.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.status = "deleted";
        state.error = null;
        state.blogs = null;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        console.log(action.payload);
        state.status = "error";
        state.error = action.payload.message;
        state.blogs = [];
      });
  },
});

export const selectBlogData = (state) => state.blogs.blog;
export const selectBlogsData = (state) => state.blogs.blogs;
export const selectBlogsError = (state) => state.blogs.error;
export const selectBlogsStatus = (state) => state.blogs.status;

export const { setBlogStatus } = blogSlice.actions;

export default blogSlice.reducer;
