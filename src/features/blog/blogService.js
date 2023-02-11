import { privateRequest } from "../../utils/APIRequest";

const writeNewBlog = async (blogData) => {
  const response = await privateRequest.post("/blog/", blogData);
  return response;
};

const getUserBlogs = async () => {
  const response = await privateRequest.get(`/blog/user`);
  return response;
};

const getUserBlogsByUserId = async (userId) => {
  const response = await privateRequest.get(`/blog/user/${userId}`);
  return response;
};

const getAllBlogs = async () => {
  const response = await privateRequest.get(`/blog/all`);
  return response;
};

const getABlog = async (blogId) => {
  const response = await privateRequest.get(`/blog/${blogId}`);
  return response;
};

const updateBlog = async ({ data, blogId }) => {
  const response = await privateRequest.patch(`/blog/${blogId}`, data);
  return response;
};

const deleteBlog = async (blogId) => {
  const response = await privateRequest.delete(`/blog/${blogId}`);
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
