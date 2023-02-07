import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Radio, Space, Button, Image } from "antd";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  addNewBlog,
  updateBlog,
  selectBlogsData,
  selectBlogsError,
  selectBlogsStatus,
  setBlogStatus,
} from "../features/blog/blogSlice";
import {
  getAllCategories,
  selectCategoriesData,
  selectCategoriesError,
  selectCategoriesStatus,
} from "../features/categories/categoriesSlice";
import {
  deleteImage,
  uploadBlogImages,
  selectUploadImagesData,
  selectUploadImagesError,
  selectUploadImagesStatus,
  uploadPlaceholderImage,
} from "../features/upload/uploadSlice";

import Editor from "../components/Editor";
import CustomInput from "../components/common-components/CustomInput";
import LoadingPage from "../components/common-components/loading-page/LoadingPage";

import "react-quill/dist/quill.snow.css";

const Write = () => {
  const [uploadedImagesAddresses, setUploadedImagesAddresses] = useState([]);
  const [editMode, setEditMode] = useState(null);

  const loadingToast = useRef();
  const blogRef = useRef(null);

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allBlogs = useSelector(selectBlogsData);
  const blogsError = useSelector(selectBlogsError);
  const blogsStatus = useSelector(selectBlogsStatus);
  const categories = useSelector(selectCategoriesData);
  const categoriesError = useSelector(selectCategoriesError);
  const categoriesStatus = useSelector(selectCategoriesStatus);
  const uploadImagesData = useSelector(selectUploadImagesData);
  const uploadImagesError = useSelector(selectUploadImagesError);
  const uploadImagesStatus = useSelector(selectUploadImagesStatus);

  const notifyLoading = () =>
    (loadingToast.current = toast.loading(
      `${editMode ? "Updating" : "Adding"} Blog`
    ));

  useEffect(() => {
    const blogId = params?.blogId;
    if (blogId) {
      const blog = allBlogs.filter((blog) => blog._id === blogId);
      setEditMode(blog[0]);
    }
  }, []);

  const newImageAddedToQuill = (data) => {
    setUploadedImagesAddresses((prevState) => [...prevState, data]);
  };

  useEffect(() => {
    if (categoriesStatus === "idle") {
      dispatch(getAllCategories());
    }
    if (blogsStatus === "rejected") {
      toast.error(`${blogsError}`);
      return;
    }
    if (blogsStatus === "added") {
      toast.success("New Blog added");
      return navigate(`/user/blogs/${allBlogs[0]._id}`);
    }
    if (blogsStatus === "updated") {
      toast.success("Blog Updated");
      return navigate(`/user/blogs/${editMode._id}`);
    }
  }, [categoriesStatus, blogsStatus, uploadImagesStatus]);

  const schema = yup.object().shape({
    blog: yup.string().required("Blog is required"),
    title: yup.string().required("Title is required"),
    visibility: yup.string().required("Please select one"),
    category: yup.string().required("Please select a category"),
    placeholderImg: yup
      .string()
      .required("Please upload one placeholder image"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      blog: editMode?.blog || "",
      title: editMode?.title || "",
      visibility: editMode?.visibility || "",
      category: editMode?.category?._id || "",
      placeholderImg: editMode?.placeholderImg?.url || "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      dispatch(setBlogStatus("loading"));
      notifyLoading();
      const imagesToAdd = await deleteUnwantedImages();

      // check if url or file
      const re = /(?:\.([^.]+))?$/;
      const ext = re.exec(values.placeholderImg)[1];

      let res = "";
      if (!ext) {
        const url = await dispatch(
          uploadPlaceholderImage([formik.values.placeholderImg])
        );
        res = url?.payload[0];
      } else {
        res = editMode.placeholderImg;
      }
      const data = { ...values, placeholderImg: res, images: imagesToAdd };

      if (!editMode) {
        await dispatch(addNewBlog(data));
      }

      if (editMode) {
        await dispatch(updateBlog({ data, blogId: params?.blogId }));
      }
      toast.dismiss(loadingToast.current);
    },
  });

  const deleteUnwantedImages = async () => {
    const contents = formik.values.blog;
    let imagesToAdd = [];
    uploadedImagesAddresses.forEach(async (imageMetaData) => {
      if (!contents.includes(imageMetaData.url)) {
        const { url, asset_id, public_id } = imageMetaData;
        await dispatch(deleteImage({ public_id }));
      } else {
        imagesToAdd.push(imageMetaData);
      }
    });
    return imagesToAdd;
  };

  const handleSaveAsDraft = () => {};

  return blogsStatus === "loading" ? (
    <LoadingPage />
  ) : (
    <form onSubmit={formik.handleSubmit} className="row mt-3">
      <div className="col-9">
        {editMode && <h3 className="fs-4 py-4 pt-0"> Update Blog</h3>}
        {/* upload button */}
        <button type="submit" className="btn btn-primary me-5">
          {editMode ? "Update" : "Add"} Blog
        </button>

        {/* save as draft */}
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

          <Editor
            newImageAddedToQuill={newImageAddedToQuill}
            id="blogQuill"
            value={formik.values.blog}
            innerRef={blogRef}
            placeholder="Write Your Blog Contents Here"
            onChange={formik.handleChange("blog")}
            theme="snow"
          />

          {formik.touched.blog && formik.errors.blog ? (
            <div className="text-danger">{formik.errors.blog}</div>
          ) : null}
        </>
      </div>
      <div className="col-3 d-flex flex-column gap-4">
        {/* upload image */}
        <div className="card card-body">
          <h5 className="">Placeholder Image</h5>

          <Button
            type="primary"
            onClick={(e) => {
              document.querySelector("#placeholderImg").click();
            }}
          >
            Upload Image
          </Button>

          <input
            type="file"
            id="placeholderImg"
            style={{ display: "none" }}
            onChange={(e) => {
              formik.setFieldValue("placeholderImg", e.target.files[0]);
            }}
          />

          <div className="w-100 d-flex justify-content-center mt-3">
            {formik.values.placeholderImg && (
              <>
                <Image
                  style={{
                    maxHeight: "200px",
                    objectFit: "cover",
                    width: "100%",
                  }}
                  src={
                    new RegExp(/^[a-z][a-z0-9+.-]*:/).test(
                      formik?.values?.placeholderImg
                    )
                      ? formik?.values?.placeholderImg
                      : formik?.values?.placeholderImg === "" ||
                        !formik?.values?.placeholderImg === null ||
                        !formik?.values?.placeholderImg ||
                        formik.values.placeholderImg === undefined
                      ? ""
                      : URL.createObjectURL(formik?.values?.placeholderImg)
                  }
                />
              </>
              // ?fix this
            )}
          </div>

          {formik.touched.placeholderImg && formik.errors.placeholderImg ? (
            <div className="text-danger mt-2">
              {formik.errors.placeholderImg}
            </div>
          ) : null}
        </div>

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
