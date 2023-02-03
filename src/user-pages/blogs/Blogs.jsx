import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getUserBlogs,
  selectBlogsData,
  selectBlogsStatus,
} from "../../features/blog/blogSlice";
import { selectCurrentUserId } from "../../features/auth/authSlice";

import Blog from "../../components/user-components/blog/Blog";

import "./blogs.scss";

const Blogs = () => {
  const allBlogs = useSelector(selectBlogsData);
  const blogStatus = useSelector(selectBlogsStatus);
  const userId = useSelector(selectCurrentUserId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (blogStatus === "idle") {
      dispatch(getUserBlogs(userId));
    }
  }, [blogStatus]);

  return (
    <div className="blogs pt-3">
      <h5>Blogs</h5>
      <div className="blog-posts">
        {allBlogs &&
          allBlogs.map((blog) => {
            return <Blog key={blog._id} data={blog} />;
          })}
      </div>
    </div>
  );
};
export default Blogs;
