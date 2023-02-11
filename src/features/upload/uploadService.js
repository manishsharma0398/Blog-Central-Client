import { privateRequest, publicRequest } from "../../utils/APIRequest";

const uploadBlogImages = async (images) => {
  const response = await privateRequest.post(`/image/blogs`, images);
  return response;
};

const uploadProfileImages = async ({ formData, userId }) => {
  const response = await privateRequest.post(
    `/user/profile-pic/${userId}`,
    formData
  );
  return response;
};

const deleteImages = async (public_id) => {
  const response = await privateRequest.post(`/image`, public_id);
  return response;
};

const uploadService = {
  uploadBlogImages,
  uploadProfileImages,
  deleteImages,
};

export default uploadService;
