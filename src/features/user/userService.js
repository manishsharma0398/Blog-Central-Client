import { privateRequest, publicRequest } from "../../utils/APIRequest";

const updateProfile = async (data) => {
  const response = await privateRequest.patch(`/profile`, data);
  return response;
};

const getAllProfiles = async () => {
  const response = await privateRequest.get(`/profile/all`);
  return response;
};

const getUserProfile = async (query) => {
  const { email, userId, username } = query;

  const response = await privateRequest.get(
    `/profile/?userId=${userId || ""}&email=${email || ""}&username=${
      username || ""
    }`
  );
  return response;
};

const updateProfilePicture = async ({ formData, userId }) => {
  const response = await privateRequest.post(
    `/user/profile-pic/${userId}`,
    formData
  );
  return response;
};

const deleteProfilePicture = async (userId) => {
  const response = await privateRequest.delete(`/user/profile-pic/${userId}`);
  return response;
};

const getAllUsers = async () => {
  const response = await privateRequest.get(`/user/all`);
  return response;
};

const getDashboardData = async () => {
  const response = await privateRequest.get(`/user/dashboard`);
  return response;
};

const userServices = {
  getAllUsers,
  updateProfile,
  getAllProfiles,
  getUserProfile,
  getDashboardData,
  updateProfilePicture,
  deleteProfilePicture,
};

export default userServices;
