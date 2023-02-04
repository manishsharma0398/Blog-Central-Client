import { BrowserRouter, Route, Routes } from "react-router-dom";

import UserLayout from "./components/layout/user-layout/UserLayout";
import AdminLayout from "./components/layout/AdminLayout";

import HomePage from "./common-pages/HomePage";
import Login from "./common-pages/auth/Login";
import Register from "./common-pages/auth/Register";
import ForgotPassword from "./common-pages/auth/ForgotPassword";
import ResetPassword from "./common-pages/auth/ResetPassword";

import Users from "./admin-pages/Users";
import AddCategory from "./admin-pages/category/AddCategory";
import CategoryList from "./admin-pages/category/CategoryList";
import AllBlogs from "./admin-pages/blogs/AllBlogs";
import BlogsByUser from "./admin-pages/blogs/BlogsByUser";

import Index from "./user-pages/Index";
import MyBlogs from "./user-pages/MyBlogs";
import Draft from "./user-pages/Draft";
import Write from "./user-pages/New Blog";
import SingleBlog from "./user-pages/single/SingleBlog";

import "antd/dist/reset.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />

          <Route path="user" element={<UserLayout />}>
            <Route index element={<Index />} />
            <Route path="blogs" element={<MyBlogs />} />
            <Route path="blogs/:blogId" element={<SingleBlog />} />
            <Route path="draft" element={<Draft />} />
            <Route path="write" element={<Write />} />
            <Route path="write/:blogId" element={<Write />} />
          </Route>

          <Route path="admin" element={<AdminLayout />}>
            <Route path="users" element={<Users />} />

            <Route path="categories/add" element={<AddCategory />} />
            <Route
              path="categories/edit/:categoryId"
              element={<AddCategory />}
            />
            <Route path="categories/all" element={<CategoryList />} />

            <Route path="blogs">
              <Route path="all" element={<AllBlogs />} />
              <Route path="user" element={<BlogsByUser />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
