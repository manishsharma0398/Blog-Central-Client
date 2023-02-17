import { Pagination as Pages } from "antd";

const Pagination = ({ onChange, totalDocuments }) => {
  return (
    <Pages
      size="default"
      defaultCurrent={1}
      onChange={onChange}
      total={totalDocuments}
      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
    />
  );
};
export default Pagination;
