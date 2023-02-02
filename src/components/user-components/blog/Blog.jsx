import { Link } from "react-router-dom";

import "./blog.scss";

const Blog = ({ data }) => {
  const { _id, img, title, blog } = data;

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="row blog">
      <div className="col-7">
        <Link className="blog-title" to={`/blogs/${_id}`}>
          {title}
        </Link>

        <div>{getText(blog)}</div>

        <Link
          to={`/blogs/${_id}`}
          className="btn btn-outline-primary read-more"
        >
          Read More
        </Link>
      </div>
      <div className="col-1"></div>
      <div className="col-4 img-container">
        <img src={img} alt="" />
      </div>
    </div>
  );
};
export default Blog;
