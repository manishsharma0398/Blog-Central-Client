const userData = localStorage.getItem("blog_central")
  ? JSON.parse(localStorage.getItem("blog_central"))
  : null;

export const axiosConfig = {
  headers: {
    Authorization: `Bearer ${userData.token}`,
    Accept: "application/json",
  },
};

export const getUserId = () => userData.user.id;
