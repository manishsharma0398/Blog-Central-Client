import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import {
  selectCurrentUser,
  selectUserError,
  selectUserStatus,
} from "../../features/auth/authSlice";

import Navbar from "../user-components/Navbar";
import Footer from "../user-components/footer/Footer";
import { toast } from "react-toastify";

const Layout = () => {
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
    <div id="page-container">
      <Navbar />
      <div id="content">
        <div id="content-wrap" className="container">
          <Outlet />
        </div>
      </div>
      <div id="footer" className="py-3 box-shadow-top">
        <Footer />
      </div>
    </div>
  );
};
export default Layout;
