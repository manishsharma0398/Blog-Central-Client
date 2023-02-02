import { Link } from "react-router-dom";

import "./blogSuggestion.scss";

const BlogSuggestion = ({ id, title, img }) => {
  return (
    <div className="suggestion d-flex flex-column">
      <h2 className="p-0 m-0">{title}</h2>
      <img
        src="https://images.pexels.com/photos/3694755/pexels-photo-3694755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
      />
      <Link
        to={`/blogs/${id}`}
        className="btn btn-outline-primary read-more mt-1"
      >
        Read More
      </Link>
    </div>
  );
};
export default BlogSuggestion;
