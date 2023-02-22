import * as yup from "yup";
import { useCallback, useEffect } from "react";
import { useFormik } from "formik";
import { Checkbox, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllCategories,
  selectCategoriesData,
  selectCategoriesStatus,
} from "../../../features/categories/categoriesSlice";
import { getAllBlogs } from "../../../features/blog/blogSlice";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";

import "./filterBlogs.scss";

const FilterBlogs = () => {
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const dispatch = useDispatch();
  const categories = useSelector(selectCategoriesData);
  const categoriesStatus = useSelector(selectCategoriesStatus);

  const sort = [
    {
      value: "views",
      label: "Views",
    },
    {
      value: "likes",
      label: "Likes",
    },
    {
      value: "createdAt",
      label: "Created At",
    },
  ];

  const schema = yup.object().shape({
    categories: yup.array().of(yup.string()),
    sortOrder: yup.string(),
    sort: yup.string(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      categories: [],
      sort: "views",
      sortOrder: "asc",
    },
    validationSchema: schema,
    onSubmit: async (values) => {},
  });

  const onSortOrderHandler = () => {
    if (formik.values.sortOrder === "asc") {
      formik.setFieldValue("sortOrder", "desc");
    } else {
      formik.setFieldValue("sortOrder", "asc");
    }
  };

  const debounceAPICall = (func) => {
    let timer;

    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 1000);
    };
  };

  const onChangeSearch = () => {
    dispatch(getAllBlogs({ ...formik.values }));
  };

  const optimisedSearch = debounceAPICall(onChangeSearch);
  // const optimisedSearch = useCallback(debounceAPICall(onChangeSearch), []);

  // useEffect(() => {
  //   // dispatch(getAllBlogs({ ...formik.values }));
  //   optimisedSearch();
  // }, []);

  useEffect(() => {
    // dispatch(getAllBlogs({ ...formik.values }));
    optimisedSearch();
  }, [formik.values.categories, formik.values.sort, formik.values.sortOrder]);

  return (
    <form onSubmit={formik.handleSubmit} className="filter-blogs">
      <div className="filter">
        <div className="filter-blogs-sort">
          <p>Sort By:</p>
          <div className="filter-blogs-sort-actions">
            <Select
              className="sort-dropdown"
              value={formik.values.sort}
              defaultValue="views"
              style={{
                width: 120,
              }}
              onChange={formik.handleChange("sort")}
              options={sort}
            />

            <button
              type="button"
              onClick={onSortOrderHandler}
              className="sort-order"
            >
              {formik.values.sortOrder === "asc" && "Ascending"}
              {formik.values.sortOrder === "desc" && "Descending"}
            </button>
          </div>
        </div>

        {categoriesStatus === "success" && (
          <div className="filter-blogs-categories">
            <p>Filter By Categories:</p>
            <Checkbox.Group
              className="filter-blogs-categories-list"
              onChange={(categories) => {
                formik.setFieldValue("categories", categories);
              }}
            >
              {categories.map((cat) => (
                <Checkbox key={cat._id} value={cat._id}>
                  {capitalizeFirstLetter(cat.category)}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </div>
        )}
      </div>
    </form>
  );
};
export default FilterBlogs;
