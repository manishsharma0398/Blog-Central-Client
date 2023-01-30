import makeRequest from "../../utils/makeRequest";

// headers: {
//     Authorization: "Bearer " + "",
//   },

const login = async (userData) => {
  const response = await makeRequest.post("/auth/login", userData);

  return response;
};

const authService = { login };
export default authService;
