import { Checkbox, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  getAllCategories,
  selectCategoriesData,
  selectCategoriesStatus,
} from "../../../features/categories/categoriesSlice";
import { getAllBlogs } from "../../../features/blog/blogSlice";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";

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
    console.log(checkedCategories);
    dispatch(
      getAllBlogs({ sort: sortBy, sortOrder, categories: checkedCategories })
    );
  };

  const optimisedSearch = useCallback(debounceAPICall(onChangeSearch), []);

  useEffect(() => {
    if (!firstRender.current) {
      console.log("call if any data chang");
      optimisedSearch();
    } else {
      console.log("I will get aclled only at start");
      dispatch(getAllCategories());

      dispatch(getAllBlogs({ categories: [] }));
      firstRender.current = false;
    }
  }, [checkedCategories, sortBy, sortOrder, optimisedSearch]);

  const handleCheckedCategories = (cats) => {
    setCheckedCategories(() => [...[], cats]);
  };

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
            <Checkbox.Group
              className="filter-blogs-categories-list"
              // onChange={(cats) => setCheckedCategories((prev) => cats)}
              // onChange={handleCheckedCategories}
            >
              {categories?.map((cat) => (
                <Checkbox
                  onChange={(e) =>
                    setCheckedCategories((prevCheckedCats) => {
                      const iAmChecked = prevCheckedCats.includes(
                        e.target.value
                      );

                      console.log(iAmChecked);

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
