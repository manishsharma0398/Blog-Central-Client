import { Link } from "react-router-dom";

import "./blog.scss";

const Blog = ({ id, img, title, blog }) => {
  return (
    <div className="row blog">
      <div className="col-7">
        <Link className="blog-title" to={`/blogs/${id}`}>
          {title}
        </Link>

        <p className="">{blog}</p>

        <Link to={`/blogs/${id}`} className="btn btn-outline-primary read-more">
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
