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

const getAllBlogs = async (filterData) => {
  const { userId, page, sort, sortOrder, categories, search, email, limit } =
    filterData;
  const response = await privateRequest.get(
    `/blog/all?userId=${userId}&page=${page}&sort=${sort || ""}&sortOrder=${
      sortOrder || ""
    }&categories=${categories ? categories?.toString() : ""}&search=${
      search || ""
    }&email=${email || ""}&limit=${limit || ""}`
  );
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

const handleLikes = async (blogId) => {
  const response = await privateRequest.post(`/blog/like/${blogId}`);
  return response;
};

const blogServices = {
  getABlog,
  updateBlog,
  deleteBlog,
  handleLikes,
  getAllBlogs,
  getUserBlogs,
  writeNewBlog,
  getUserBlogsByUserId,
};

export default blogServices;
