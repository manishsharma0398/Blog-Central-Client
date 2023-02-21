import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export const OnlyNotAuth = () => {
  const { isLoggedIn, profile, isAdmin } = useAuth();

  return !isLoggedIn ? (
    <Outlet />
  ) : isAdmin ? (
    <Navigate to="/admin" replace />
  ) : !profile || profile === null || profile === undefined ? (
    <Navigate
      to="/profile/update"
      state={{ profileAfterLogin: true }}
      replace
    />
  ) : (
    <Navigate to="/" replace />
  );
};

export const NoAdmin = () => {
  const { isAdmin, isLoggedIn } = useAuth();

  return isLoggedIn && isAdmin ? <Navigate to="/admin" replace /> : <Outlet />;
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
