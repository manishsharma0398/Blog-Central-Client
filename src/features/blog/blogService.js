import { axiosHeader, makeRequest } from "../../utils/makeRequest";

const writeNewBlog = async (blogData) => {
  const response = await makeRequest.post("/blog/", blogData, axiosHeader);
  return response;
};

const getUserBlogs = async () => {
  const response = await makeRequest.get(`/blog/user`, axiosHeader);
  return response;
};

const getUserBlogsByUserId = async (userId) => {
  const response = await makeRequest.get(`/blog/user/${userId}`, axiosHeader);
  return response;
};

const getAllBlogs = async () => {
  const response = await makeRequest.get(`/blog/all`, axiosHeader);
  return response;
};

const getABlog = async (blogId) => {
  const response = await makeRequest.get(`/blog/${blogId}`, axiosHeader);
  return response;
};

const updateBlog = async ({ data, blogId }) => {
  const response = await makeRequest.patch(
    `/blog/${blogId}`,
    data,
    axiosHeader
  );
  return response;
};

const deleteBlog = async (blogId) => {
  const response = await makeRequest.delete(`/blog/${blogId}`, axiosHeader);
  return response;
};

const blogServices = {
  writeNewBlog,
  getUserBlogs,
  getAllBlogs,
  getUserBlogsByUserId,
  getABlog,
  updateBlog,
  deleteBlog,
};

export default blogServices;
