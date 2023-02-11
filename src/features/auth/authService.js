import { privateRequest, publicRequest } from "../../utils/APIRequest";

const login = async (userData) => {
  const response = await publicRequest.post("/auth/login", userData);
  return response;
};

const logout = async () => {
  const response = await privateRequest.post("/auth/logout");
  return response;
};

const authService = { login, logout };
export default authService;
