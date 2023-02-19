import moment from "moment/moment";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Popover, Tag } from "antd";
import { LikeOutlined } from "@ant-design/icons";

import { likeBlog } from "../../../features/blog/blogSlice";
import { FALLBACK_PROFILE_PIC } from "../../../utils/variables";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";
import useAuth from "../../../hooks/useAuth";

import "./blog.scss";

const Blog = ({ data }) => {
  const {
    _id,
    user,
    tags,
    title,
    views,
    likes,
    liked,
    category,
    createdAt,
    description,
    placeholderImg,
  } = data;

  const dispatch = useDispatch();

  const handleLikePost = async () => {
    await dispatch(likeBlog(_id));
  };

  const { isLoggedIn, isUser, isAdmin } = useAuth();

  const userPopOverBlog = () => {
    return (
      <div className="d-flex gap-3">
        <img
          style={{ height: "100px", width: "100px" }}
          src={data?.user?.profilePic?.url || FALLBACK_PROFILE_PIC}
          alt={data?.user?.name}
          title={data?.user?.name}
        />
        <div className="" style={{ height: "100px" }}>
          <p>{data?.user?.name}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="blog">
      <div className="blog-placeholder_image">
        <img src={placeholderImg?.url} alt={title} />
      </div>
      <div className="blog-details">
        <div className="blog-actions">
          {/* TODO: do not show to admin and not logged in */}
          {isLoggedIn && isUser && (
            <Button
              type={liked ? "primary" : "default"}
              onClick={handleLikePost}
              size="middle"
              style={{ display: "flex", alignItems: "center" }}
            >
              <LikeOutlined /> Like
            </Button>
          )}
          <Tag color="#108ee9" className="tags">
            {!likes ? 0 : likes} likes
          </Tag>
          <Tag color="#f50" className="tags">
            {views} views
          </Tag>
        </div>

        <Link
          className="blog-details_title"
          to={`/blogs/${_id}`}
          state={{ category: category._id }}
        >
          {title}
        </Link>

        <p className="blog-details_author">
          <Popover content={userPopOverBlog}>
            <Link className="author" to={`/profile/${user?.email}`}>
              {user?.name}
            </Link>
          </Popover>
          <time>{moment(createdAt).fromNow()}</time>
        </p>
        <p className="blog-details_description">{description}</p>

        <div className="blog-actions">
          <Tag color="#108ee9" className="tags">
            {capitalizeFirstLetter(category.category)}
          </Tag>

          {tags.map((tag, i) => (
            <Tag key={i} color="#108ee9" className="tags">
              #{tag}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
