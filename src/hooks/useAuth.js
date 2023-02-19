import { useSelector } from "react-redux";

import {
  selectCurrentUser,
  selectCurrentUserToken,
} from "../features/auth/authSlice";

const useAuth = () => {
  const token = useSelector(selectCurrentUserToken);
  const userData = useSelector(selectCurrentUser);
  let isLoggedIn = false;
  let isUser = false;
  let isAdmin = false;
  let role = "";

  if (token) {
    isLoggedIn = !!userData?._id;
    isAdmin = userData?.role === "admin";
    isUser = userData?.role === "user";
    role = userData?.role;
  }

  return { isLoggedIn, isUser, isAdmin, role };
};
export default useAuth;
