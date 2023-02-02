export const access_token = () =>
  localStorage.getItem("blog_central")
    ? JSON.parse(localStorage.getItem("blog_central")).token
    : null;
