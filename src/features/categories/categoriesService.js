import { privateRequest, publicRequest } from "../../utils/APIRequest";

const getAllCategories = async () => {
  const response = await privateRequest.get("/category/all");
  return response;
};

const addNewCategory = async (newCategoryData) => {
  const response = await privateRequest.post("/category", newCategoryData);
  return response;
};

const updateCategory = async ({ category, categoryId }) => {
  const response = await privateRequest.patch(`/category/${categoryId}`, {
    category,
  });
  return response;
};

const deleteCategory = async (categoryId) => {
  const response = await privateRequest.delete(`/category/${categoryId}`);
  return response;
};

const categoriesService = {
  getAllCategories,
  addNewCategory,
  updateCategory,
  deleteCategory,
};

export default categoriesService;
