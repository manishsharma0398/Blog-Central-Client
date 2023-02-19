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

  console.log(data);

  const response = await publicRequest.post(`/auth/password-reset/${token}`, {
    ...other,
  });

  return response;
};

const logout = async () => {
  const response = await privateRequest.post("/auth/logout");
  return response;
};

const authService = { login, register, logout, forgotPassword, resetPassword };

export default authService;
