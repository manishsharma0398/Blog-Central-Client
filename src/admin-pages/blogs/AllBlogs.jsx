import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getAllBlogs,
  selectBlogsStatus,
  selectBlogsData,
  selectBlogsError,
} from "../../features/blog/blogSlice";

import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import TableComponent from "../../components/common-components/TableComponent";
import CustomModal from "../../components/common-components/CustomModal";

const columns = [
  {
    title: "S.No",
    dataIndex: "slNo",
    key: "slNo",
  },
  {
    title: "Blog Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "User",
    dataIndex: "user",
    key: "user",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Engagement",
    children: [
      {
        title: "Views",
        dataIndex: "views",
        key: "views",
      },
      {
        title: "Likes",
        dataIndex: "likes",
        key: "likes",
      },
      {
        title: "Comments",
        dataIndex: "comments",
        key: "comments",
      },
    ],
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];

const AllBlogs = () => {
  const [open, setOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const loadingToast = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blogsStatus = useSelector(selectBlogsStatus);
  const blogsError = useSelector(selectBlogsError);
  const blogs = useSelector(selectBlogsData);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

  useEffect(() => {
    if (blogsStatus === "deleted") {
      toast.dismiss(loadingToast.current);
      toast.warn("Blog Deleted");
      dispatch(getAllBlogs());
    }
  }, [blogsStatus]);

  const notifyLoading = () =>
    (loadingToast.current = toast.loading("Deleting Blog"));

  const handleDeleteBlog = () => {
    console.log(selectedBlog);
    // dispatch(deleteCategory(selectedBlog));
    notifyLoading();
    setOpen(false);
  };

  const showModal = (catId) => {
    setOpen(true);
    setSelectedBlog(catId);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const data = [];
  for (let i = 0; i < blogs?.length; i++) {
    const { _id, user, title, category } = blogs[i];

    data.push({
      key: _id,
      slNo: i + 1,
      user: <Link to={`/admin/user/${user._id}`}>{user.name}</Link>,
      title,
      status: "",
      category: "",
      // category?.category[0].toUpperCase() + category?.category?.splice(1),

      action: (
        <>
          <Link to={`/admin/categories/edit/${_id}`}>
            <BiEdit className="fs-4" />
          </Link>
          <button
            type="button"
            onClick={() => showModal(_id)}
            className="btn text-danger ms-3"
          >
            <AiFillDelete className="fs-4" />
          </button>
        </>
      ),
    });
  }

  return (
    <>
      <h3 className="mb-4">All Blogs</h3>
      <TableComponent
        isLoading={blogsStatus === "loading"}
        columns={columns}
        data={data}
      />
      <CustomModal
        title="Are you sure delete this blog?"
        open={open}
        hideModal={hideModal}
        action={handleDeleteBlog}
      />
    </>
  );
};
export default AllBlogs;
