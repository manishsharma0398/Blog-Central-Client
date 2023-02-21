import { useSelector } from "react-redux";

import {
  selectCurrentUser,
  selectCurrentUserToken,
} from "../features/auth/authSlice";
import { selectProfileData } from "../features/user/userSlice";

const useAuth = () => {
  const profile = useSelector(selectProfileData);
  const userData = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentUserToken);

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

  return { isLoggedIn, isUser, isAdmin, role, profile };
};
export default useAuth;
