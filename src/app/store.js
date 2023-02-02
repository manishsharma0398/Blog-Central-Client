import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../features/auth/authSlice";
import blogSlice from "../features/blog/blogSlice";
import categoriesSlice from "../features/categories/categoriesSlice";

const store = configureStore({
  reducer: {
    user: authSlice,
    categories: categoriesSlice,
    blogs: blogSlice,
  },
});

export default store;
