import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import confirm from "antd/es/modal/confirm";

import {
  getAllCategories,
  selectCategoriesData,
  selectCategoriesError,
  selectCategoriesStatus,
  deleteCategory,
} from "../../features/categories/categoriesSlice";

import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import TableComponent from "../../components/common-components/TableComponent";
import CustomModal from "../../components/common-components/CustomModal";
import { toast } from "react-toastify";

const columns = [
  {
    title: "S.No",
    dataIndex: "slNo",
    key: "slNo",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];

const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const loadingToast = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoriesStatus = useSelector(selectCategoriesStatus);
  const error = useSelector(selectCategoriesError);
  const categories = useSelector(selectCategoriesData);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  useEffect(() => {
    if (categoriesStatus === "deleted") {
      toast.dismiss(loadingToast.current);
      toast.warn("Category Deleted");
      dispatch(getAllCategories());
    }
  }, [categoriesStatus]);

  const notifyLoading = () =>
    (loadingToast.current = toast.loading("Deleting Category"));

  const handleDeleteCategory = () => {
    console.log(selectedCategory);
    dispatch(deleteCategory(selectedCategory));
    notifyLoading();
    setOpen(false);
  };

  const showModal = (catId) => {
    setOpen(true);
    setSelectedCategory(catId);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const data = [];
  for (let i = 0; i < categories?.length; i++) {
    const { _id, category } = categories[i];

    data.push({
      key: _id,
      slNo: i + 1,
      category: category[0].toUpperCase() + category.slice(1),

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
      <h3 className="mb-4">Categories</h3>
      <TableComponent
        isLoading={categoriesStatus === "loading"}
        columns={columns}
        data={data}
      />
      <CustomModal
        title="Are you sure delete this category?"
        open={open}
        hideModal={hideModal}
        action={handleDeleteCategory}
      />
    </>
  );
};
export default CategoryList;
