import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllBlogs,
  selectBlogsData,
  selectBlogsStatus,
  selectBlogsMetaData,
} from "../../features/blog/blogSlice";
import { selectUserStatus } from "../../features/auth/authSlice";

import Blog from "../../components/user-components/blog/Blog";
import ResultPage from "../../components/common-components/ResultPage";
import LoadingPage from "../../components/common-components/loading-page/LoadingPage";
import FilterBlogs from "../../components/common-components/filter-blogs/FilterBlogs";
import Pagination from "../../components/common-components/pagination/Pagination";

import "./styles.scss";

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const allBlogs = useSelector(selectBlogsData);
  const userStatus = useSelector(selectUserStatus);
  const blogStatus = useSelector(selectBlogsStatus);
  const blogMetaData = useSelector(selectBlogsMetaData);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userStatus === "loggedIn") {
      dispatch(getAllBlogs({}));
    }
  }, [userStatus]);

  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="index">
      <FilterBlogs page={currentPage} />
      <div className="blog-posts">
        {blogStatus === "loading" ? (
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
        )}
        <div className="d-flex justify-content-end">
          <Pagination
            onChange={onChange}
            totalDocuments={blogMetaData?.totalDocuments}
            // totalDocuments={500}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
