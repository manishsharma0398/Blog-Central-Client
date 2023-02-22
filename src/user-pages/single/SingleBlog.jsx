import moment from "moment";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import { GrEdit } from "react-icons/gr";
import { useEffect, useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { SmileOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import {
  getABlog,
  deleteBlog,
  getAllBlogs,
  selectSingleBlogData,
  selectSingleBlogError,
  selectSingleBlogStatus,
} from "../../features/blog/blogSlice";
import { selectCurrentUser } from "../../features/auth/authSlice";
import useAuth from "../../hooks/useAuth";

import ResultPage from "../../components/common-components/ResultPage";
import CustomModal from "../../components/common-components/CustomModal";
import LoadingPage from "../../components/common-components/loading-page/LoadingPage";
import BlogSuggestion from "../../components/user-components/suggestion/BlogSuggestion";

import "./singleBlog.scss";

const SingleBlog = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const history = useLocation();
  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);
  const singleBlog = useSelector(selectSingleBlogData);
  const singleBlogError = useSelector(selectSingleBlogError);
  const singleBlogStatus = useSelector(selectSingleBlogStatus);

  useEffect(() => {
    dispatch(getABlog(params?.blogId));
    dispatch(getAllBlogs({ categories: history?.state?.category }));
  }, [params?.blogId, history?.state?.category]);

  const showModal = () => {
    setOpenDeleteModal(true);
  };
  const hideModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeletePost = async () => {
    const response = await dispatch(deleteBlog(singleBlog?._id));
    console.log(response);

    setOpenDeleteModal(false);

    if (response.type === "blog/delete/fulfilled") {
      toast.warn("Blog Deleted");
      return navigate(`/profile/${currentUser?.email}`);
    }
  };

  const { isLoggedIn, isUser } = useAuth();

  const {
    _id,
    tags,
    user,
    blog,
    title,
    category,
    createdAt,
    updatedAt,
    placeholderImg,
  } = singleBlog || {};
  const { _id: authorId, name, profilePic } = user || {};

  {
    return singleBlogStatus === "loading" ? (
      <LoadingPage />
    ) : singleBlogStatus === "error" ? (
      singleBlogError === "Invalid Blog Id" ? (
        <ResultPage
          title="Invalid Blog ID"
          subTitle="The Blog ID you entered is wrong"
          btnText="Back Home"
          goToLink="/"
          icon={<SmileOutlined />}
        />
      ) : singleBlogError === "Blog not found" ? (
        <ResultPage
          status="404"
          title="Blog Not Found"
          subTitle="Blog either deleted or does not exist"
          btnText="Back Home"
          goToLink="/"
        />
      ) : (
        <ResultPage
          status="500"
          title="Sorry, something went wrong."
          btnText="Back Home"
          goToLink="/"
        />
      )
    ) : !singleBlog || singleBlog === null ? (
      <ResultPage
        status="500"
        title="Sorry, something went wrong."
        btnText="Back Home"
        goToLink="/"
      />
    ) : (
      <>
        {" "}
        <div className="row my-3">
          <div className="col-sm-12 col-md-8 col-lg-9 single-blog">
            <div className="img-container">
              <img src={placeholderImg?.url} alt={title} />
            </div>

            <h1 className="post-title m-0 p-0">{title}</h1>

            <div className="author">
              <img src={profilePic?.url} alt={name} />
              <div className="info">
                <span>{name}</span>
                <p className="m-0 p-0">
                  <span className="d-block">
                    {createdAt === updatedAt ? (
                      <>Created {moment(createdAt).startOf("hour").fromNow()}</>
                    ) : (
                      <>Updated {moment(updatedAt).startOf("hour").fromNow()}</>
                    )}
                  </span>
                </p>
              </div>
              {isLoggedIn && isUser && currentUser?._id === authorId && (
                <div className="edit">
                  <Link className="btn m-0 p-2" to={`/user/write/${_id}`}>
                    <GrEdit className="fs-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => showModal()}
                    className="btn m-0 p-2"
                  >
                    {" "}
                    <AiTwotoneDelete className="fs-4 text-danger" />
                  </button>
                </div>
              )}
            </div>

            <div className="post">
              <ReactQuill theme="bubble" value={blog} readOnly={true} />
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 d-flex flex-column gap-4">
            {/* {allBlogs.length > 0 && (
              <>
                <h3 className="fs-4">Other Posts you may like</h3>

                {allBlogs.map((blog) => (
                  <BlogSuggestion
                    key={blog?._id}
                    title={blog?.title}
                    id={blog?._id}
                    img={blog?.placeholderImg?.url}
                  />
                ))}

              </>
            )} */}
          </div>
        </div>
        <CustomModal
          title="Delete this blog, Really ?"
          open={openDeleteModal}
          hideModal={hideModal}
          action={handleDeletePost}
        />
      </>
    );
  }
};

export default SingleBlog;
