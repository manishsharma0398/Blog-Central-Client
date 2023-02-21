import { BrowserRouter, Route, Routes } from "react-router-dom";

import AdminLayout from "./components/layout/AdminLayout";
import UserLayout from "./components/layout/user-layout/UserLayout";

import Login from "./common-pages/auth/Login";
import NoContent from "./common-pages/NoContent";
import Register from "./common-pages/auth/Register";
import Unauthorized from "./common-pages/Unauthorized";
import ResetPassword from "./common-pages/auth/ResetPassword";
import ForgotPassword from "./common-pages/auth/ForgotPassword";

import Users from "./admin-pages/Users";
import AllBlogs from "./admin-pages/blogs/AllBlogs";
import BlogsByUser from "./admin-pages/blogs/BlogsByUser";
import Dashboard from "./admin-pages/dashboard/Dashboard";
import AddCategory from "./admin-pages/category/AddCategory";
import CategoryList from "./admin-pages/category/CategoryList";

import MyBlogs from "./user-pages/MyBlogs";
import Write from "./user-pages/add-blog/New Blog";
import Index from "./user-pages/homepage/Homepage";
import Settings from "./user-pages/settings/Settings";
import VerifyAccount from "./user-pages/VerifyAccount";
import SingleBlog from "./user-pages/single/SingleBlog";
import UpdateProfile from "./user-pages/profile/UpdateProfile";
import UserProfile from "./user-pages/user-profile/UserProfile";

import {
  NoAdmin,
  OnlyAuthUser,
  OnlyNotAuth,
} from "./components/RouteProtection";

import "antd/dist/reset.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="">
          <Route element={<OnlyAuthUser allowedRoles={["admin"]} />}>
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />

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

          <Route path="/" element={<UserLayout />}>
            <Route path="unauthorized" element={<Unauthorized />} />

            <Route element={<NoAdmin />}>
              <Route index element={<Index />} />
              <Route path="blogs/:blogId" element={<SingleBlog />} />
              <Route path="profile/update" element={<UpdateProfile />} />
              <Route path="profile/:username" element={<UserProfile />} />
            </Route>

            <Route element={<OnlyNotAuth />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password/:token" element={<ResetPassword />} />
            </Route>

            <Route element={<OnlyAuthUser allowedRoles={["user"]} />}>
              <Route path="verify-account/:token" element={<VerifyAccount />} />
              <Route path="user/blogs" element={<MyBlogs />} />
              <Route path="user/settings" element={<Settings />} />
              <Route path="user/write" element={<Write />} />
              <Route path="user/write/:blogId" element={<Write />} />
            </Route>
          </Route>

          <Route path="*" element={<NoContent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
