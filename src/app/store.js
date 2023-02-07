import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../features/auth/authSlice";
import blogSlice from "../features/blog/blogSlice";
import uploadSlice from "../features/upload/uploadSlice";
import categoriesSlice from "../features/categories/categoriesSlice";

const store = configureStore({
  reducer: {
    user: authSlice,
    blogs: blogSlice,
    upload: uploadSlice,
    categories: categoriesSlice,
  },
});

export default store;
