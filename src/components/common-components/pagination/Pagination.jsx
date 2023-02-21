import { Pagination as Pages } from "antd";

const Pagination = ({ onChange, totalDocuments, limit }) => {
  return (
    <Pages
      defaultPageSize={limit || 20}
      size="default"
      defaultCurrent={1}
      onChange={onChange}
      total={totalDocuments || 0}
      // TODO: Fix pagiantion
      // showTotal={(total, range) => {
      //   console.log({ total, range });
      //   if (total === 0) return "Loading....";

      //   return `${range[0]}-${range[1]} of ${total} items`;
      // }}
    />
  );
};
export default Pagination;
