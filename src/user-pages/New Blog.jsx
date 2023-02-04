import * as yup from "yup";
import { useFormik } from "formik";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Radio, Space, Upload } from "antd";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  addNewBlog,
  selectBlogsData,
  selectBlogsError,
  selectBlogsStatus,
  updateBlog,
} from "../features/blog/blogSlice";
import {
  getAllCategories,
  selectCategoriesData,
  selectCategoriesStatus,
  selectCategoriesError,
} from "../features/categories/categoriesSlice";

import CustomInput from "../components/common-components/CustomInput";
import LoadingPage from "../components/common-components/loading-page/LoadingPage";

import "react-quill/dist/quill.snow.css";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Write = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const loadingToast = useRef();
  const blogRef = useRef();

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allBlogs = useSelector(selectBlogsData);
  const categories = useSelector(selectCategoriesData);
  const blogsStatus = useSelector(selectBlogsStatus);
  const categoriesStatus = useSelector(selectCategoriesStatus);
  const blogsError = useSelector(selectBlogsError);
  const categoriesError = useSelector(selectCategoriesError);

  const notifyLoading = () =>
    (loadingToast.current = toast.loading(
      `${selectedBlog ? "Updating" : "Adding"} Blog`
    ));

  useEffect(() => {
    const blogId = params?.blogId;
    if (blogId) {
      const blog = allBlogs.filter((blog) => blog._id === blogId);
      setSelectedBlog(blog[0]);
    }
  }, []);

  useEffect(() => {
    if (categoriesStatus === "idle") {
      dispatch(getAllCategories());
    }
    if (blogsStatus === "loading") {
      notifyLoading();
    }
    if (blogsStatus === "rejected") {
      toast.error(`${blogsError}`);
      return;
    }
    if (blogsStatus === "added") {
      toast.success("New Blog added");
      // http://localhost:5173/user/blogs/63d8387e20c4f30fafbfb4b1
      return navigate(`/user/blogs/${allBlogs[0]._id}`);
    }
    if (blogsStatus === "updated") {
      toast.success("Blog Updated");
      return navigate(`/user/blogs/${selectedBlog._id}`);
    }
  }, [categoriesStatus, blogsStatus]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    blog: yup.string().required("Blog is required"),
    category: yup.string().required("Please select a category"),
    visibility: yup.string().required("Please select one"),
    images: yup.array(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: selectedBlog?.title || "",
      blog: selectedBlog?.blog || "",
      category: selectedBlog?.category?._id || "",
      visibility: selectedBlog?.visibility || "",
      images: selectedBlog?.images || [],
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      if (selectedBlog) {
        await dispatch(updateBlog({ values, blogId: selectedBlog._id }));
      }
      if (!selectedBlog) {
        await dispatch(addNewBlog(values));
      }
      toast.dismiss(loadingToast.current);
    },
  });

  const handleSaveAsDraft = (e) => {
    e.preventDefault();
    console.log(formik.values);
  };

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return blogsStatus === "loading" ? (
    <LoadingPage />
  ) : (
    <form onSubmit={formik.handleSubmit} className="row">
      <div className="col-9">
        <h3 className="fs-4 py-4 pt-3">
          {selectedBlog ? "Update Blog" : "Write New Blog"}
        </h3>
        {/* upload button */}
        <button type="submit" className="btn btn-primary me-5">
          {selectedBlog ? "Update" : "Add"} Blog
        </button>

        {/* upload button */}
        <button
          onClick={handleSaveAsDraft}
          type="button"
          className="btn btn-warning ms-5"
        >
          Save as draft
        </button>

        <CustomInput
          id="title"
          label="Title"
          placeholder="Blog Title"
          type="text"
          className="m-0"
          value={formik.values.title}
          onChange={formik.handleChange("title")}
        />

        {formik.touched.title && formik.errors.title ? (
          <div className="text-danger">{formik.errors.title}</div>
        ) : null}

        <>
          <label
            onClick={() => {
              blogRef.current.focus();
            }}
            className="py-2"
          >
            Blog
          </label>
          <ReactQuill
            id="blogQuill"
            placeholder="Write Your Blog Contents Here"
            ref={blogRef}
            theme="snow"
            value={formik.values.blog}
            onChange={formik.handleChange("blog")}
            style={{ height: "400px" }}
          />

          {formik.touched.blog && formik.errors.blog ? (
            <div className="text-danger">{formik.errors.blog}</div>
          ) : null}
        </>
      </div>
      <div className="col-3 d-flex flex-column gap-4 pt-5">
        {/* status */}
        <div className="card card-body">
          <h5 className="">Visibility</h5>
          <Radio.Group
            onChange={formik.handleChange("visibility")}
            value={formik.values.visibility}
          >
            <Space direction="vertical">
              <Radio value="public">Public</Radio>
              <Radio value="private">Private</Radio>
            </Space>
          </Radio.Group>

          {formik.touched.visibility && formik.errors.visibility ? (
            <div className="text-danger mt-2">{formik.errors.visibility}</div>
          ) : null}
        </div>

        {/* upload image */}
        <div className="d-flex flex-column justify-content-center align-items-center py-4 card">
          <p className="text-center">Select Image To upload</p>
          <div style={{ height: "100px", width: "100px" }}>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{
                  width: "100%",
                }}
                src={previewImage}
              />
            </Modal>
          </div>
        </div>

        {/* select category */}
        <div className="card card-body">
          <h5 className="">Category</h5>

          <Radio.Group
            onChange={formik.handleChange("category")}
            value={formik.values.category}
          >
            <Space direction="vertical">
              {categories.map((category) => {
                return (
                  <Radio key={category._id} value={category._id}>
                    {category.category.charAt(0).toUpperCase() +
                      category.category.slice(1)}
                  </Radio>
                );
              })}
            </Space>
          </Radio.Group>

          {formik.touched.category && formik.errors.category ? (
            <div className="text-danger mt-2">{formik.errors.category}</div>
          ) : null}

          {categoriesError && <div className="error">{categoriesError}</div>}
        </div>
      </div>
    </form>
  );
};
export default Write;
