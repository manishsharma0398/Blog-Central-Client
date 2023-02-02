import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import AdminLayout from "./components/layout/AdminLayout";

import Users from "./admin-pages/Users";

import HomePage from "./common-pages/HomePage";
import Login from "./common-pages/auth/Login";
import Register from "./common-pages/auth/Register";
import ForgotPassword from "./common-pages/auth/ForgotPassword";

// import ResetPassword from "./common-pages/auth/ResetPassword";

// import Dashboard from "./pages/Dashboard";
// import Write from "./pages/New Blog";
// import Draft from "./pages/Draft";
// import Blogs from "./pages/blogs/Blogs";
// import SingleBlog from "./pages/single/SingleBlog";

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
          <Route path="user" element={<Layout />}></Route>
          <Route path="admin" element={<AdminLayout />}>
            <Route path="users" element={<Users />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
