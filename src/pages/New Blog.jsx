import { useState, useRef, Fragment, useEffect } from "react";
import { Form, Input as AntInput, Modal, Radio, Space, Upload } from "antd";
import * as yup from "yup";
import { useFormik } from "formik";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import Input from "../components/Input";

import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  selectAllCategories,
  selectCategoryStatus,
} from "../features/categories/categoriesSlice";
import { addNewBlog } from "../features/blog/blogSlice";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Write = () => {
  const categories = useSelector(selectAllCategories);
  const categoriesStatus = useSelector(selectCategoryStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    if (categoriesStatus === "idle") {
      dispatch(getCategories());
    }
    console.log(categories);
  }, [categoriesStatus]);

  const [category, setCategory] = useState("art");
  // const [categories, setcategories] = useState([]);
  const [visibility, setVisibility] = useState("public");
  const [status, setStatus] = useState("draft");

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const blogRef = useRef();

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    blog: yup.string().required("Blog is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      blog: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      const blogData = { ...values, category, visibility, status, fileList };
      await dispatch(addNewBlog(blogData));
      //   await dispatch(login(values));
      console.log(blogData);
    },
  });

  // const categories = [
  //   { value: "art" },
  //   { value: "science" },
  //   { value: "technology" },
  //   { value: "cinema" },
  //   { value: "design" },
  //   { value: "food" },
  // ];

  const onChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const onChangeVisibility = (e) => {
    setVisibility(e.target.value);
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
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

  return (
    <Fragment>
      <div className="row">
        <div className="col-9">
          <h3 className="fs-4 py-4 pt-3">Write New Blog</h3>
          {/* upload button */}
          <button
            onClick={formik.handleSubmit}
            type="button"
            className="btn btn-primary w-25"
          >
            Post Blog
          </button>

          <Input
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
            <p>Status: {status}</p>

            <h5 className="">Visibility:</h5>
            <Radio.Group
              className="mb-3"
              onChange={onChangeVisibility}
              value={visibility}
            >
              <Space direction="vertical">
                <Radio value="public">Public</Radio>
                <Radio value="private">Private</Radio>
              </Space>
            </Radio.Group>
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

            <Radio.Group onChange={onChangeCategory} value={category}>
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
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Write;
