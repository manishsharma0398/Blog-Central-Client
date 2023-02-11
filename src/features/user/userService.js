import { privateRequest } from "../../utils/APIRequest";

const updateProfile = async (data) => {
  const response = await privateRequest.patch(`/profile`, data);
  return response;
};

const getAllProfiles = async () => {
  const response = await privateRequest.get(`/profile/all`);
  return response;
};

const getUserProfile = async (userId) => {
  const response = await privateRequest.get(`/profile/${userId}`);
  return response;
};

const deleteProfilePicture = async (userId) => {
  const response = await privateRequest.delete(`/user/profile-pic/${userId}`);
  return response;
};

const userServices = {
  updateProfile,
  getAllProfiles,
  getUserProfile,
  deleteProfilePicture,
};

export default userServices;
