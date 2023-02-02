import { axiosConfig, getUserId } from "../../utils/axios_config";
import makeRequest from "../../utils/makeRequest";

const writeNewBlog = async (blogData) => {
  const response = await makeRequest.post("/blog/", blogData, axiosConfig);
  return response;
};

const getUserBlogs = async (userId) => {
  const response = await makeRequest.get(`/blog/user/${userId}`, axiosConfig);
  return response;
};

const blogServices = { writeNewBlog, getUserBlogs };
export default blogServices;
