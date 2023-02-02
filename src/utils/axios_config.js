const userData = localStorage.getItem("blog_central")
  ? JSON.parse(localStorage.getItem("blog_central"))
  : null;

const token = userData?.token;

export const axiosConfig = {
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  },
};

export const getUserId = () => userData?.user?.id;
