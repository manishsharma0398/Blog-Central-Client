import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import {
  selectCurrentUser,
  selectUserError,
  selectUserStatus,
} from "../../../features/auth/authSlice";

import Navbar from "../../user-components/Navbar";
import Footer from "../../user-components/footer/Footer";

import "react-toastify/dist/ReactToastify.css";
import "./userLayout.scss";

const UserLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);
  const userStatus = useSelector(selectUserStatus);
  const userError = useSelector(selectUserError);

  useEffect(() => {
    if (!currentUser) {
      toast.error("Please log in to continue");
      return navigate("/login");
    }
  }, [currentUser]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar />
      <div id="content" className="container">
        <Outlet />
      </div>
      <div id="footer" className="py-3 box-shadow-top">
        <Footer />
      </div>
    </>
  );
};
export default UserLayout;
