import { makeRequest } from "../../utils/makeRequest";

const login = async (userData) => {
  const response = await makeRequest.post("/auth/login", userData);

  if (response.data) {
    localStorage.setItem("blog_central", JSON.stringify(response.data));
  }

  return response;
};

const logout = async () => {
  if (localStorage.getItem("blog_central")) {
    localStorage.setItem("blog_central", JSON.stringify(""));
    localStorage.removeItem("blog_central");
  }
};

const authService = { login };
export default authService;
