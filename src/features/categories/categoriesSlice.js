import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriesService from "./categoriesService";

const initialState = {
  categories: [],
  status: "idle",
  error: null,
};

export const getCategories = createAsyncThunk(
  "categories/fetch",
  async (thunkAPI) => {
    try {
      const response = await categoriesService.getAllCategories();
      console.log(response);
      return { ...response.data };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.status = "loading";
        state.categories = [];
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = "success";
        console.log(action.payload);
        state.categories = action.payload.categories;
        state.error = null;
      })
      .addCase(getCategories.rejected, (state, action) => {
        console.log(action.payload);
        state.status = "error";
        state.categories = [];
        console.log(action.payload);
        // state.error = null
      });
  },
});

export const selectAllCategories = (state) => state.categories.categories;
export const selectCategoryStatus = (state) => state.categories.status;

export default categoriesSlice.reducer;
