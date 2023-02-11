import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectBlogsData,
  selectBlogsStatus,
  getAllBlogs,
} from "../features/blog/blogSlice";
import { selectUserStatus } from "../features/auth/authSlice";

import Blog from "../components/user-components/blog/Blog";
import ResultPage from "../components/common-components/ResultPage";
import LoadingPage from "../components/common-components/loading-page/LoadingPage";

const Index = () => {
  const allBlogs = useSelector(selectBlogsData);
  const blogStatus = useSelector(selectBlogsStatus);
  const userStatus = useSelector(selectUserStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userStatus === "loggedIn") {
      dispatch(getAllBlogs());
    }
  }, [userStatus]);

  return blogStatus === "loading" ? (
    <LoadingPage />
  ) : blogStatus === "error" ? (
    <ResultPage
      status="500"
      title="Sorry, something went wrong."
      btnText="Back Home"
      goToLink="/user"
    />
  ) : allBlogs && allBlogs.length < 1 ? (
    <ResultPage
      status="warning"
      title="No blogs"
      btnText="Write new blog"
      goToLink="/user/write"
    />
  ) : (
    <div className="blog-posts">
      {allBlogs &&
        allBlogs?.map((blog) => {
          return <Blog key={blog._id} data={blog} />;
        })}
    </div>
  );
};

export default Index;
