import { Link } from "react-router-dom";

import "./blogSuggestion.scss";

const BlogSuggestion = ({ id, title, img }) => {
  return (
    <div className="suggestion d-flex flex-column">
      <h2 className="p-0 m-0">{title}</h2>
      <img src={img} alt={title} />
      <Link
        to={`/user/blogs/${id}`}
        className="btn btn-outline-primary read-more mt-1"
      >
        Read More
      </Link>
    </div>
  );
};
export default BlogSuggestion;
