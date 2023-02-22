import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Search from "antd/es/input/Search";

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

  // useEffect(() => {
  //   dispatch(getAllBlogs({ page: currentPage }));
  // }, [userStatus]);

  const onChange = (pageNumber) => {
    setCurrentPage((_) => pageNumber);
    dispatch(getAllBlogs({ page: currentPage }));
  };

  const debounceAPICall = (func) => {
    let timer;

    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 1000);
    };
  };

  const onChangeSearch = (e) => {
    dispatch(getAllBlogs({ search: e.target.value }));
  };

  const optimisedSearch = useCallback(debounceAPICall(onChangeSearch), []);

  return (
    <div className="index">
      <div className="search-blogs">
        <Link to="/user/write" className="btn btn-primary cta-new-blog">
          Write Blog
        </Link>

        <Search
          className="search-input"
          placeholder="Search Blog"
          allowClear
          onChange={optimisedSearch}
        />
      </div>

      <div className="homepage">
        <FilterBlogs />
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
