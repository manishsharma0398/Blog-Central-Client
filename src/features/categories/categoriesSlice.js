import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriesService from "./categoriesService";

const initialState = {
  categories: [],
  status: "idle",
  error: null,
};

export const getAllCategories = createAsyncThunk(
  "categories/fetch",
  async (thunkAPI) => {
    try {
      const response = await categoriesService.getAllCategories();
      // console.log(response);
      return response.data;
    } catch (err) {
      console.log(err.response);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const addNewCategory = createAsyncThunk(
  "categories/add",
  async (newCategory, thunkAPI) => {
    try {
      const response = await categoriesService.addNewCategory(newCategory);
      return response.data;
    } catch (error) {
      // return thunkAPI.rejectWithValue(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/update",
  async (updtData, thunkAPI) => {
    try {
      const response = await categoriesService.updateCategory(updtData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (categoryId, thunkAPI) => {
    try {
      const response = await categoriesService.deleteCategory(categoryId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.status = "success";
        state.categories = action.payload.categories;
        state.error = null;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        console.log(action);
        state.status = "rejected";
        state.error = action.payload.message;
      })
      .addCase(addNewCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewCategory.fulfilled, (state, action) => {
        state.status = "added";
        state.error = null;
        state.categories = action.payload;
      })
      .addCase(addNewCategory.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
      })
      .addCase(updateCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = "updated";
        state.error = null;
        state.categories = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = "deleted";
        state.error = null;
        state.categories = action.payload;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
      });
  },
});

export const selectCategoriesData = (state) => state.categories.categories;
export const selectCategoriesStatus = (state) => state.categories.status;
export const selectCategoriesError = (state) => state.categories.error;

export const { getCategoryDetailsById } = categoriesSlice.actions;

export default categoriesSlice.reducer;
