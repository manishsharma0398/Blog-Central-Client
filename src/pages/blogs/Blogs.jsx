import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBlog, selectAllUserBlogs } from "../../features/blog/blogSlice";
import Blog from "../../components/blog/Blog";
import { selectAllUserBlogsStatus } from "../../features/blog/blogSlice";

import "./blogs.scss";
import { selectCurrentUserId } from "../../features/auth/authSlice";

const Blogs = () => {
  const allBlogs = useSelector(selectAllUserBlogs);
  const blogStatus = useSelector(selectAllUserBlogsStatus);
  const userId = useSelector(selectCurrentUserId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (blogStatus === "idle") {
      dispatch(getUserBlog(userId));
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
