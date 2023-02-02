import { axiosHeader, makeRequest } from "../../utils/makeRequest";

const writeNewBlog = async (blogData) => {
  const response = await makeRequest.post("/blog/", blogData, axiosHeader);
  return response;
};

const getUserBlogs = async (userId) => {
  const response = await makeRequest.get(`/blog/user/${userId}`, axiosHeader);
  return response;
};

const blogServices = { writeNewBlog, getUserBlogs };
export default blogServices;
