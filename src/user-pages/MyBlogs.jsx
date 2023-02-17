import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllBlogs,
  getUserBlogs,
  selectBlogsData,
  selectBlogsStatus,
} from "../features/blog/blogSlice";

import Blog from "../components/user-components/blog/Blog";
import ResultPage from "../components/common-components/ResultPage";
import LoadingPage from "../components/common-components/loading-page/LoadingPage";
import { selectCurrentUserId } from "../features/auth/authSlice";

const MyBlogs = () => {
  const allBlogs = useSelector(selectBlogsData);
  const blogStatus = useSelector(selectBlogsStatus);
  const userId = useSelector(selectCurrentUserId);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogs({ userId }));
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
    <>
      <div className="blog-posts">
        {allBlogs &&
          allBlogs.map((blog) => {
            return <Blog key={blog._id} data={blog} />;
          })}
      </div>
    </>
  );
};
export default MyBlogs;
