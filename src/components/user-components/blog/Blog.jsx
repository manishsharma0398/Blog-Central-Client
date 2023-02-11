import { Link } from "react-router-dom";

import "./blog.scss";

const Blog = ({ data }) => {
  const { _id, placeholderImg, title, description } = data;

  return (
    <div className="row blog">
      <div className="col-sm-12 col-md-8 d-flex flex-column gap-3 mb-4">
        <Link className="blog-title" to={`/user/blogs/${_id}`}>
          <h1>{title}</h1>
        </Link>

        <div>{description}</div>

        <Link
          style={{ width: "max-content" }}
          to={`/user/blogs/${_id}`}
          className="btn btn-outline-primary read-more"
        >
          Read More
        </Link>
      </div>
      <div className="col-sm-12 col-md-4 img-container">
        <img src={placeholderImg?.url} alt={title} />
      </div>
    </div>
  );
};
export default Blog;
