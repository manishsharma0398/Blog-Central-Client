import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Empty } from "antd";
import Search from "antd/es/input/Search";

import { debounce } from "../../utils/debounce";

import {
  getAllBlogs,
  selectBlogsData,
  selectBlogsStatus,
  selectBlogsMetaData,
} from "../../features/blog/blogSlice";

import Blog from "../../components/user-components/blog/Blog";
import ResultPage from "../../components/common-components/ResultPage";
import LoadingPage from "../../components/common-components/loading-page/LoadingPage";
import FilterBlogs from "../../components/common-components/filter-blogs/FilterBlogs";
import Pagination from "../../components/common-components/pagination/Pagination";

import "./styles.scss";

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const allBlogs = useSelector(selectBlogsData);
  const blogStatus = useSelector(selectBlogsStatus);
  const blogMetaData = useSelector(selectBlogsMetaData);

  const dispatch = useDispatch();

  const onChange = (pageNumber) => {
    if (pageNumber != currentPage) {
      setCurrentPage(pageNumber);
      dispatch(getAllBlogs({ page: currentPage }));
    }
  };

  const searchDebounceHandler = (func, timer) => debounce(func, timer);

  const searchBlogs = searchDebounceHandler((searchTerm) => {
    dispatch(getAllBlogs({ search: searchTerm }));
  }, 500);

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
          onChange={(e) => searchBlogs(e.target.value)}
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
              btnText="Reload Page"
              goToLink="/"
            />
          ) : allBlogs && allBlogs.length < 1 ? (
            <Empty className="mt-5" description="No blogs" />
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
