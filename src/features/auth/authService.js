import { privateRequest, publicRequest } from "../../utils/APIRequest";

const login = async (userData) => {
  const response = await publicRequest.post("/auth/login", userData);
  return response;
};

const register = async (userData) => {
  const response = await publicRequest.post("/user/register", userData);
  return response;
};

const forgotPassword = async (email) => {
  const response = await publicRequest.post("/auth/password-forgot", email);
  return response;
};

const resetPassword = async (data) => {
  const { token, ...other } = data;

  const response = await publicRequest.post(`/auth/password-reset/${token}`, {
    ...other,
  });

  return response;
};

const logout = async () => {
  const response = await privateRequest.post("/auth/logout");
  return response;
};

const deleteUser = async (userId) => {
  const response = await privateRequest.delete(`/user/${userId}`);
  return response;
};

const handleRefreshToken = async (token) => {
  const response = await privateRequest.post(`/auth/refresh`, { token });
  return response;
};

const authService = {
  login,
  logout,
  register,
  deleteUser,
  resetPassword,
  forgotPassword,
  handleRefreshToken,
};

export default authService;
