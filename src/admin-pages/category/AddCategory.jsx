import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";

import {
  addNewCategory,
  selectCategoriesError,
  selectCategoriesStatus,
  selectCategoriesData,
  updateCategory,
} from "../../features/categories/categoriesSlice";

import CustomInput from "../../components/common-components/CustomInput";

const AddCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const loadingToast = useRef();
  const path = useParams();
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoriesError = useSelector(selectCategoriesError);
  const categoriesStatus = useSelector(selectCategoriesStatus);
  const categories = useSelector(selectCategoriesData);

  const notifyLoading = () =>
    (loadingToast.current = toast.loading(
      `${
        selectedCategory?.category ? "Updating Category" : "Adding New Category"
      }`
    ));

  useEffect(() => {
    if (path?.categoryId) {
      const catId = path.categoryId;
      const category = categories.find((cat) => cat._id === catId);
      setSelectedCategory(category);
    }
  }, []);

  useEffect(() => {
    if (categoriesStatus === "loading") {
      notifyLoading();
    }
    if (categoriesStatus === "rejected") {
      toast.error(`${categoriesError}`);
      return;
    }
    if (categoriesStatus === "added") {
      toast.success("New Category added");
      return navigate("/admin/categories/all");
    }
    if (categoriesStatus === "updated") {
      toast.success("Category Updated");
      return navigate("/admin/categories/all");
    }
  }, [categoriesStatus]);

  const schema = yup.object({
    category: yup.string().required("Required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      category: selectedCategory?.category ? selectedCategory?.category : "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      console.log(values);
      if (selectedCategory?.category) {
        await dispatch(
          updateCategory({
            categoryId: path?.categoryId,
            ...values,
          })
        );
      }
      if (!selectedCategory?.category) {
        await dispatch(addNewCategory(values));
      }
      toast.dismiss(loadingToast.current);
    },
  });

  return (
    <>
      <h3 className="mb-4">
        {selectedCategory?.category ? "Edit " : "Add "}Category
      </h3>
      <div className="">
        <form onSubmit={formik.handleSubmit}>
          {categoriesError && categoriesStatus === "rejected" && (
            <div className="error">{categoriesError}</div>
          )}

          <CustomInput
            type="text"
            label="Enter New Category"
            onChange={(e) => {
              const value = e.target.value;
              formik.setFieldValue("category", value.toLowerCase());
            }}
            value={formik.values.category}
          />
          <div className="error">
            {formik.touched.category && formik.errors.category ? (
              <div>{formik.errors.category}</div>
            ) : null}
          </div>

          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 mt-3"
          >
            {selectedCategory?.category ? "Update " : "Add "} Category
          </button>
        </form>
      </div>
    </>
  );
};
export default AddCategory;
