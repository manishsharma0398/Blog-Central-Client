import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

import blogServices from "./blogService";

const initialState = {
  blogs: [],
  error: null,
  status: "idle",
  singleBlog: {
    blog: null,
    error: null,
    status: "idle",
  },
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

export const getAllBlogs = createAsyncThunk(
  "blog/all",
  async (filterData, thunkAPI) => {
    try {
      const response = await blogServices.getAllBlogs(filterData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

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

export const likeBlog = createAsyncThunk(
  "blog/like",
  async (blogId, thunkAPI) => {
    try {
      const response = await blogServices.handleLikes(blogId);
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
    resetSingleBlog(state, action) {
      state.singleBlog.blog = null;
      state.singleBlog.error = null;
      state.singleBlog.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewBlog.pending, (state) => {
        state.singleBlog.status = "loading";
        state.singleBlog.blog = null;
        state.singleBlog.error = null;
      })
      .addCase(addNewBlog.fulfilled, (state, action) => {
        state.singleBlog.blog = action.payload;
        state.singleBlog.error = null;
        state.singleBlog.status = "added";
      })
      .addCase(addNewBlog.rejected, (state, action) => {
        state.singleBlog.status = "error";
        state.singleBlog.blog = [];
        state.singleBlog.error = action.payload.message;
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
        state.singleBlog.status = "loading";
        state.singleBlog.error = null;
        state.singleBlog.blog = null;
      })
      .addCase(getABlog.fulfilled, (state, action) => {
        state.singleBlog.blog = action.payload;
        state.singleBlog.error = null;
        state.singleBlog.status = "success";
      })
      .addCase(getABlog.rejected, (state, action) => {
        state.singleBlog.status = "error";
        state.singleBlog.error = action.payload.message;
        state.singleBlog.blog = null;
      })
      .addCase(updateBlog.pending, (state) => {
        state.singleBlog.status = "loading";
        state.singleBlog.blog = null;
        state.singleBlog.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.singleBlog.blog = action.payload;
        state.singleBlog.error = null;
        state.singleBlog.status = "updated";
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.singleBlog.error = action.payload.message;
        state.singleBlog.blog = null;
        state.singleBlog.status = "error";
      })
      .addCase(deleteBlog.pending, (state) => {
        state.singleBlog.status = "loading";
        state.singleBlog.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.singleBlog.status = "deleted";
        state.singleBlog.error = null;
        state.singleBlog.blog = null;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.singleBlog.status = "error";
        state.singleBlog.error = action.payload.message;
        state.singleBlog.blog = null;
      })
      .addCase(likeBlog.pending, (state) => {
        // state.status = "loading";
        // state.error = null;
      })
      .addCase(likeBlog.fulfilled, (state, action) => {
        const updtArrayIndex = current(state.blogs.blogs).findIndex(
          (blog) => blog._id === action.payload._id
        );

        state.blogs.blogs[updtArrayIndex]["likes"] = action.payload.likes;
        state.blogs.blogs[updtArrayIndex]["liked"] = action.payload.liked;
      })
      .addCase(likeBlog.rejected, (state, action) => {
        console.log(action.payload);
        // state.status = "error";
        // state.error = action.payload.message;
        // state.blogs = [];
      });
  },
});

export const selectBlogsMetaData = (state) => state.blogs.blogs;

export const selectSingleBlogData = (state) => state.blogs.singleBlog.blog;
export const selectSingleBlogStatus = (state) => state.blogs.singleBlog.status;
export const selectSingleBlogError = (state) => state.blogs.singleBlog.error;

export const selectBlogsError = (state) => state.blogs.error;
export const selectBlogsStatus = (state) => state.blogs.status;
export const selectBlogsData = (state) => state.blogs.blogs.blogs;

export const { setBlogStatus, resetSingleBlog } = blogSlice.actions;

export default blogSlice.reducer;
