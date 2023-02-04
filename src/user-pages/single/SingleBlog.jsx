import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import { formatDistance } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrEdit } from "react-icons/gr";
import { AiTwotoneDelete } from "react-icons/ai";
import { SmileOutlined } from "@ant-design/icons";

import {
  deleteBlog,
  getABlog,
  selectBlogsData,
  selectBlogsError,
  selectBlogsStatus,
} from "../../features/blog/blogSlice";
import { selectCurrentUserId } from "../../features/auth/authSlice";

import BlogSuggestion from "../../components/user-components/suggestion/BlogSuggestion";
import CustomModal from "../../components/common-components/CustomModal";
import LoadingPage from "../../components/common-components/loading-page/LoadingPage";
import ResultPage from "../../components/common-components/ResultPage";

import "./singleBlog.scss";

const SingleBlog = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteBlogId, setDeleteBlogId] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const allBlogs = useSelector(selectBlogsData);
  const blogStatus = useSelector(selectBlogsStatus);
  const blogError = useSelector(selectBlogsError);
  const userId = useSelector(selectCurrentUserId);

  useEffect(() => {
    dispatch(getABlog(params.blogId));
  }, []);

  useEffect(() => {
    if (blogStatus === "error") {
      console.log("Something went wrong");
    }
    if (blogStatus === "deleted") {
      toast.warn("Blog Deleted");
      return navigate("/user/blogs");
    }
  }, [blogStatus]);

  const showModal = (blogId) => {
    setOpenDeleteModal(true);
    setDeleteBlogId(blogId);
  };
  const hideModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeletePost = () => {
    dispatch(deleteBlog(deleteBlogId));
    setOpenDeleteModal(false);
  };

  {
    return blogStatus === "loading" ? (
      <LoadingPage />
    ) : blogStatus === "error" ? (
      blogError === "Invalid Blog Id" ? (
        <ResultPage
          title="Invalid Blog ID"
          subTitle="The Blog ID you entered is wrong"
          btnText="Back Home"
          goToLink="/user"
          icon={<SmileOutlined />}
        />
      ) : blogError === "Blog not found" ? (
        <ResultPage
          status="404"
          title="Blog Not Found"
          subTitle="Blog either deleted or does not exist"
          btnText="Back Home"
          goToLink="/user"
        />
      ) : (
        <ResultPage
          status="500"
          title="Sorry, something went wrong."
          btnText="Back Home"
          goToLink="/user"
        />
      )
    ) : !allBlogs || allBlogs === null ? (
      <div>No Content</div>
    ) : (
      allBlogs?.map((blogs, i) => {
        const {
          blog,
          category,
          createdAt,
          updatedAt,
          images,
          tags,
          title,
          user,
          _id,
        } = blogs;
        const { _id: authorId, name } = user || {};
        console.log(blogs);
        return (
          <div className="row">
            <CustomModal
              title="Delete this blog, Really ?"
              open={openDeleteModal}
              hideModal={hideModal}
              action={handleDeletePost}
            />
            <div className="col-8 single-blog">
              <div className="img-container py-4 pt-5">
                <img
                  src="https://scontent-pnq1-1.xx.fbcdn.net/v/t1.6435-9/140907302_1668200646685019_6032558996023706173_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=krD2KKy1tMgAX_SQ9Rt&_nc_ht=scontent-pnq1-1.xx&oh=00_AfAkM4Q2U33RODBD7uXU1OrsveRDGemmHLRNg9lrkAeFmQ&oe=63FF7649"
                  alt=""
                />
              </div>

              <div className="author">
                <img src="" alt="" />
                <div className="info">
                  <span>{name}</span>
                  <p className="m-0 p-0">
                    <span className="d-block">
                      Created{" "}
                      {formatDistance(new Date(createdAt), new Date(), {
                        addSuffix: true,
                      })}
                    </span>
                    {createdAt !== updatedAt && (
                      <span className="d-block">
                        Updated{" "}
                        {formatDistance(new Date(updatedAt), new Date(), {
                          addSuffix: true,
                        })}
                      </span>
                    )}
                  </p>
                </div>
                {userId === authorId && (
                  <div className="ms-2 edit">
                    <Link className="btn m-0 p-2" to={`/user/write/${_id}`}>
                      <GrEdit className="fs-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => showModal(_id)}
                      className="btn m-0 p-2"
                    >
                      {" "}
                      <AiTwotoneDelete className="fs-4 text-danger" />
                    </button>
                  </div>
                )}
              </div>

              <h1 className="post-title m-0 p-0">{title}</h1>

              <div className="post">
                <ReactQuill theme="bubble" value={blog} readOnly={true} />
              </div>
            </div>
            {/* <div className="col-1"></div> */}
            <div className="col-4 d-flex flex-column gap-4 card card-body mt-5">
              <h3 className="fs-4">Other Posts you may like</h3>

              <BlogSuggestion title="Blog Title" id="1" />
            </div>
          </div>
        );
      })[0]
    );
  }
};

export default SingleBlog;
