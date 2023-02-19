import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../features/auth/authSlice";
import blogSlice from "../features/blog/blogSlice";
import uploadSlice from "../features/upload/uploadSlice";
import categoriesSlice from "../features/categories/categoriesSlice";
import userSlice from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    blogs: blogSlice,
    upload: uploadSlice,
    categories: categoriesSlice,
    user: userSlice,
  },
  devTools: false,
});

export default store;
