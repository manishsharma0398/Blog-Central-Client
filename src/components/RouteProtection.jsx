import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export const OnlyNotAuth = () => {
  const { isLoggedIn } = useAuth();

  return !isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export const OnlyAuthUser = ({ allowedRoles }) => {
  const location = useLocation();
  const { isLoggedIn, role: UserRole } = useAuth();

  return allowedRoles?.find((role) => role === UserRole) ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to="/unauthorized" />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
