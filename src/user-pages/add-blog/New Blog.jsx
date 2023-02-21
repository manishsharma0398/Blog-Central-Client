import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Radio, Space, Image } from "antd";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  getABlog,
  updateBlog,
  addNewBlog,
  setBlogStatus,
  resetSingleBlog,
  selectSingleBlogData,
  selectSingleBlogError,
  selectSingleBlogStatus,
} from "../../features/blog/blogSlice";
import {
  getAllCategories,
  selectCategoriesData,
  selectCategoriesError,
  selectCategoriesStatus,
} from "../../features/categories/categoriesSlice";
import {
  deleteImage,
  selectUploadImagesStatus,
  uploadPlaceholderImage,
} from "../../features/upload/uploadSlice";

import Editor from "../../components/user-components/editor/Editor";
import CustomInput from "../../components/common-components/CustomInput";
import LoadingPage from "../../components/common-components/loading-page/LoadingPage";

import "react-quill/dist/quill.snow.css";
import "./newBlog.scss";

const Write = () => {
  const [uploadedImagesAddresses, setUploadedImagesAddresses] = useState([]);

  const params = useParams();
  const blogId = params?.blogId;

  const loadingToast = useRef();
  const blogRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const singleBlog = useSelector(selectSingleBlogData);
  const singleBlogError = useSelector(selectSingleBlogError);
  const singleBlogStatus = useSelector(selectSingleBlogStatus);

  const categories = useSelector(selectCategoriesData);
  const categoriesError = useSelector(selectCategoriesError);
  const categoriesStatus = useSelector(selectCategoriesStatus);
  const uploadImagesStatus = useSelector(selectUploadImagesStatus);

  const notifyLoading = () =>
    (loadingToast.current = toast.loading(
      `${blogId ? "Updating" : "Adding"} Blog`
    ));

  const newImageAddedToQuill = (data) => {
    setUploadedImagesAddresses((prevState) => [...prevState, data]);
  };

  useEffect(() => {
    if (categoriesStatus === "idle") {
      dispatch(getAllCategories());
    }
    if (singleBlogStatus === "rejected") {
      toast.error(`${singleBlogError}`);
      return;
    }
    if (singleBlogStatus === "added") {
      toast.success("New Blog added");
      return navigate(`/blogs/${singleBlog._id}`);
    }
    if (singleBlogStatus === "updated") {
      toast.success("Blog Updated");
      return navigate(`/blogs/${singleBlog._id}`);
    }
  }, [categoriesStatus, singleBlogStatus, uploadImagesStatus]);

  const schema = yup.object().shape({
    blog: yup.string().required("Blog is required"),
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    visibility: yup.string().required("Please select one"),
    category: yup.string().required("Please select a category"),
    placeholderImg: yup
      .string()
      .required("Please upload one placeholder image"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      blog: singleBlog?.blog || "",
      title: singleBlog?.title || "",
      visibility: singleBlog?.visibility || "",
      category: singleBlog?.category?._id || "",
      description: singleBlog?.description || "",
      placeholderImg: singleBlog?.placeholderImg?.url || "",
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
          uploadPlaceholderImage(formik.values.placeholderImg)
        );
        res = url?.payload;
      } else {
        res = singleBlog.placeholderImg;
      }
      const data = { ...values, placeholderImg: res, images: imagesToAdd };

      if (!singleBlog) {
        await dispatch(addNewBlog(data));
      }

      if (singleBlog) {
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

  useEffect(() => {
    formik.resetForm();
    dispatch(resetSingleBlog());
    if (blogId) {
      dispatch(getABlog(blogId));
    }
  }, []);

  return singleBlogStatus === "loading" ? (
    <LoadingPage />
  ) : (
    <form onSubmit={formik.handleSubmit} className="row my-3">
      <div className="col-md-12 col-lg-9">
        {blogId && <h3 className="fs-4 py-4 pt-0"> Update Blog</h3>}

        <div className="blog-form-buttons">
          {/* upload button */}
          <button type="submit" className="btn btn-primary">
            {blogId ? "Update" : "Add"} Blog
          </button>
        </div>

        <CustomInput
          id="title"
          type="text"
          label="Title"
          className="m-0"
          placeholder="Blog Title"
          value={formik.values.title}
          error={formik.errors.title}
          touched={formik.touched.title}
          onChange={formik.handleChange("title")}
        />

        <div className="form-floating">
          <textarea
            className="form-control mt-3"
            placeholder="Description"
            id="description"
            style={{ height: "180px" }}
            value={formik.values.description}
            onChange={formik.handleChange("description")}
          />
          <label htmlFor="description">Description</label>
        </div>

        <div id="blogQuill">
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
            value={formik.values.blog}
            innerRef={blogRef}
            placeholder="Write Your Blog Contents Here"
            onChange={formik.handleChange("blog")}
            theme="snow"
          />

          {formik.touched.blog && formik.errors.blog ? (
            <div className="text-danger">{formik.errors.blog}</div>
          ) : null}
        </div>
      </div>
      <div className="col-md-12 col-lg-3 d-flex flex-column gap-4">
        <div className="visibility-and-placeholder">
          {/* upload image */}
          <div className="card p-3">
            <h5 className="">Placeholder Image</h5>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                document.querySelector("#placeholderImg").click();
              }}
            >
              Upload Image
            </button>

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
              )}
            </div>

            {formik.touched.placeholderImg && formik.errors.placeholderImg ? (
              <div className="text-danger mt-2">
                {formik.errors.placeholderImg}
              </div>
            ) : null}
          </div>

          {/* visibility */}
          <div className="card p-3">
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
        </div>

        {/* select category */}
        <div className="card p-3">
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
