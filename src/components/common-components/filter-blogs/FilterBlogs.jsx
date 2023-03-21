import { Checkbox, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import {
  getAllCategories,
  selectCategoriesData,
  selectCategoriesStatus,
} from "../../../features/categories/categoriesSlice";
import { getAllBlogs } from "../../../features/blog/blogSlice";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";
import { debounce } from "../../../utils/debounce";

import "./filterBlogs.scss";

const FilterBlogs = () => {
  const firstRender = useRef(true);

  const [checkedCategories, setCheckedCategories] = useState([]);
  const [sortBy, setSortBy] = useState("views");
  const [sortOrder, setSortOrder] = useState("asc");

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

  const onSortOrderHandler = () => {
    setSortOrder((prevState) => (prevState === "asc" ? "desc" : "asc"));
  };

  const filterDebounceHandler = (cb, delay) => debounce(cb, delay);

  const optimisedSearch = filterDebounceHandler(
    () =>
      dispatch(
        getAllBlogs({ sort: sortBy, sortOrder, categories: checkedCategories })
      ),
    500
  );

  useEffect(() => {
    if (!firstRender.current) {
      optimisedSearch();
    } else {
      dispatch(getAllCategories());
      dispatch(getAllBlogs({ categories: [] }));
      firstRender.current = false;
    }
  }, [checkedCategories, sortBy, sortOrder]);

  return (
    <div className="filter-blogs">
      <div className="filter">
        <div className="filter-blogs-sort">
          <p>Sort By:</p>
          <div className="filter-blogs-sort-actions">
            <Select
              className="sort-dropdown"
              value={sortBy}
              defaultValue={sortBy}
              style={{
                width: 120,
              }}
              onChange={(val) => setSortBy(val)}
              options={sort}
            />

            <button
              type="button"
              onClick={onSortOrderHandler}
              className="sort-order"
            >
              {sortOrder === "asc" && "Ascending"}
              {sortOrder === "desc" && "Descending"}
            </button>
          </div>
        </div>

        {categoriesStatus === "success" && (
          <div className="filter-blogs-categories">
            <p>Filter By Categories:</p>
            <Checkbox.Group className="filter-blogs-categories-list">
              {categories?.map((cat) => (
                <Checkbox
                  onChange={(e) =>
                    setCheckedCategories((prevCheckedCats) => {
                      const iAmChecked = prevCheckedCats.includes(
                        e.target.value
                      );

                      if (!iAmChecked) {
                        return [...prevCheckedCats, e.target.value];
                      } else {
                        return prevCheckedCats.filter(
                          (cat) => cat !== e.target.value
                        );
                      }
                    })
                  }
                  key={cat._id}
                  value={cat._id}
                >
                  {capitalizeFirstLetter(cat.category)}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBlogs;
