import Blog from "../../components/blog/Blog";

import "./blogs.scss";

const Blogs = () => {
  return (
    <div className="blogs pt-3">
      <h5>Blogs</h5>
      <div className="blog-posts">
        <Blog
          id="1"
          title="Post Title #1"
          blog="Blog Post Description #1"
          img="https://images.pexels.com/photos/3694755/pexels-photo-3694755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <Blog
          id="2"
          title="Post Title #1"
          blog="Blog Post Description #1"
          img="https://images.pexels.com/photos/3694755/pexels-photo-3694755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      </div>
    </div>
  );
};
export default Blogs;
