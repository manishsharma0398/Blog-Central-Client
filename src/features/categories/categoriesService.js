import { axiosHeader, makeRequest } from "../../utils/makeRequest";

const getAllCategories = async () => {
  const response = await makeRequest.get("/category/all");
  return response;
};

const addNewCategory = async (newCategoryData) => {
  const response = await makeRequest.post(
    "/category",
    newCategoryData,
    axiosHeader
  );
  return response;
};

const updateCategory = async ({ category, categoryId }) => {
  const response = await makeRequest.patch(
    `/category/${categoryId}`,
    { category },
    axiosHeader
  );
  return response;
};

const deleteCategory = async (categoryId) => {
  const response = await makeRequest.delete(
    `/category/${categoryId}`,
    axiosHeader
  );
  return response;
};

const categoriesService = {
  getAllCategories,
  addNewCategory,
  updateCategory,
  deleteCategory,
};

export default categoriesService;
