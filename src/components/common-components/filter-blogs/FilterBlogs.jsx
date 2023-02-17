import * as yup from "yup";
import { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Divider, Input, Pagination, Select } from "antd";

import {
  getAllCategories,
  selectCategoriesData,
  selectCategoriesStatus,
} from "../../../features/categories/categoriesSlice";
import { getAllBlogs } from "../../../features/blog/blogSlice";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";

import "./filterBlogs.scss";

const FilterBlogs = ({ page }) => {
  // const [page, setPage] = useState(1);

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
    search: yup.string(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      categories: [],
      sort: "views",
      sortOrder: "asc",
      search: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      dispatch(getAllBlogs({ ...values, page }));
    },
  });

  useEffect(() => {
    dispatch(getAllBlogs({ ...formik.values, page }));
  }, [page]);

  const onSortOrderHandler = () => {
    if (formik.values.sortOrder === "asc") {
      formik.setFieldValue("sortOrder", "desc");
    } else {
      formik.setFieldValue("sortOrder", "asc");
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="filter-blogs">
      <Input
        value={formik.values.search}
        onChange={formik.handleChange("search")}
        placeholder="Search Blog"
      />

      <Divider />

      <div>
        <div className="filter-blogs-sort">
          <p>Sort By:</p>
          <div className="filter-blogs-sort-actions">
            <Select
              className="sort-dropdown"
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
              onChange={(categories) =>
                formik.setFieldValue("categories", categories)
              }
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

      <Divider />

      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
  );
};
export default FilterBlogs;
