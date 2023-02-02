import makeRequest from "../../utils/makeRequest";

const getAllCategories = async () => {
  const response = await makeRequest.get("/category/all");
  return response;
};

const categoriesService = { getAllCategories };
export default categoriesService;
