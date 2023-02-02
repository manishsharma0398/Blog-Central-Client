import { useState, useRef, Fragment } from "react";
import { Link } from "react-router-dom";

import BlogSuggestion from "../../components/suggestion/BlogSuggestion";

import "./singleBlog.scss";

const SingleBlog = () => {

  

  return (
    <>
      <div className="row">
        <div className="col-8 single-blog">
          <div className="img-container  py-4 pt-5">
            <img
              src="https://scontent-pnq1-1.xx.fbcdn.net/v/t1.6435-9/140907302_1668200646685019_6032558996023706173_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=krD2KKy1tMgAX_SQ9Rt&_nc_ht=scontent-pnq1-1.xx&oh=00_AfAkM4Q2U33RODBD7uXU1OrsveRDGemmHLRNg9lrkAeFmQ&oe=63FF7649"
              alt=""
            />
          </div>

          <div className="author">
            <img src="" alt="" />
            <div className="info">
              <span>Manish Sharma</span>
              <p className="m-0 p-0">Posted 3 months ago</p>
            </div>
            <div className="edit">
              <Link to={`/write/edit`}>Edit</Link>
              <Link to={`/delete`}> Delete</Link>
            </div>
          </div>
          <h1 className="post-title">Post Title</h1>

          <div className="post">blog here</div>
        </div>
        {/* <div className="col-1"></div> */}
        <div className="col-4 d-flex flex-column gap-4 card card-body mt-5">
          <h3 className="fs-4">Other Posts you may like</h3>

          <BlogSuggestion title="Blog Title" id="1" />
        </div>
      </div>
    </>
  );
};
export default SingleBlog;
