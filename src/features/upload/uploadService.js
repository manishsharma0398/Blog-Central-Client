import { axiosHeader, makeRequest } from "../../utils/makeRequest";

const uploadBlogImages = async (images) => {
  const response = await makeRequest.post(`/image/blogs`, images, axiosHeader);
  return response;
};

const uploadProfileImages = async (images) => {
  console.log({ images });
  const response = await makeRequest.post(
    `/image/profile`,
    images,
    axiosHeader
  );
  return response;
};

const deleteImages = async (public_id) => {
  const response = await makeRequest.post(`/image`, public_id, axiosHeader);
  return response;
};

const uploadService = { uploadBlogImages, uploadProfileImages, deleteImages };

export default uploadService;
