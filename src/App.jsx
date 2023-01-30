import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { getUserDataFromLocalStorage } from "./features/auth/authSlice";

import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Write from "./pages/New Blog";
import Draft from "./pages/Draft";
import Blogs from "./pages/blogs/Blogs";
import SingleBlog from "./pages/single/SingleBlog";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDataFromLocalStorage());
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="change-password" element={<ResetPassword />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="write" element={<Write />} />
        <Route path="draft" element={<Draft />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/:blogId" element={<SingleBlog />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
