import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllBlogs,
  selectBlogsData,
  selectBlogsStatus,
} from "../features/blog/blogSlice";

import Blog from "../components/user-components/blog/Blog";
import ResultPage from "../components/common-components/ResultPage";
import LoadingPage from "../components/common-components/loading-page/LoadingPage";

const MyBlogs = ({ email, username, userID }) => {
  const allBlogs = useSelector(selectBlogsData);
  const blogStatus = useSelector(selectBlogsStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    if (email || username || userID) {
      dispatch(getAllBlogs({ email, username, userId: userID }));
    }
  }, []);

  return blogStatus === "loading" ? (
    <LoadingPage />
  ) : blogStatus === "error" || !allBlogs || allBlogs === null ? (
    <ResultPage
      status="500"
      title="Sorry, something went wrong."
      btnText="Back Home"
      goToLink="/user"
    />
  ) : allBlogs && allBlogs.length < 1 ? (
    <ResultPage
      status="warning"
      title="You haven't added any blogs"
      btnText="Write new blog"
      goToLink="/user/write"
    />
  ) : (
    <div className="my-blogs">
      <h3 className="mb-4">My Blogs </h3>
      <div className="blog-posts">
        {allBlogs &&
          allBlogs.map((blog) => {
            return <Blog key={blog._id} data={blog} />;
          })}
      </div>
    </div>
  );
};
export default MyBlogs;
