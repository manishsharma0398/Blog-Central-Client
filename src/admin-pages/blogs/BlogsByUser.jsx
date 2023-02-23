import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import {
  getAllBlogs,
  selectBlogsData,
  selectBlogsError,
  selectBlogsStatus,
} from "../../features/blog/blogSlice";

import CustomInput from "../../components/common-components/CustomInput";
import CustomModal from "../../components/common-components/CustomModal";
import TableComponent from "../../components/common-components/TableComponent";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { Tag } from "antd";

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
    ],
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];

const BlogsByUser = () => {
  const [open, setOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const loadingToast = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blogsStatus = useSelector(selectBlogsStatus);
  const blogsError = useSelector(selectBlogsError);
  const blogs = useSelector(selectBlogsData);

  const schema = yup.object({
    userId: yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      userId: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      console.log(values);
      await dispatch(getAllBlogs({ userId: values.userId }));
      toast.dismiss(loadingToast.current);
    },
  });

  useEffect(() => {
    if (blogsStatus === "loading") {
      notifyLoading();
    }
    if (blogsStatus === "error") {
      toast.warn(`${blogsError}`);
    }
  }, [blogsStatus]);

  const notifyLoading = () =>
    (loadingToast.current = toast.loading("Fetching user blogs"));

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
    const { _id, user, title, category, likes, views, tags } = blogs[i];

    data.push({
      key: _id,
      slNo: i + 1,
      user: <Link to={`/admin/user/${user._id}`}>{user.name}</Link>,
      title,
      likes,
      views,
      tags: tags.map((tag) => <Tag>{tag}</Tag>),
      category: capitalizeFirstLetter(category.category),
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
      <h3 className="mb-4">Search Blog by User ID</h3>

      <form className="mb-3" onSubmit={formik.handleSubmit}>
        <div className="">
          {blogsError && blogsStatus === "error" && (
            <div className="error">{blogsError}</div>
          )}

          <CustomInput
            id="userId"
            type="text"
            label="User ID"
            onChange={formik.handleChange("userId")}
            value={formik.values.userId}
          />
          <div className="error">
            {formik.touched.userId && formik.errors.userId ? (
              <div>{formik.errors.userId}</div>
            ) : null}
          </div>

          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 mt-3"
          >
            Search
          </button>
        </div>
      </form>

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
export default BlogsByUser;
