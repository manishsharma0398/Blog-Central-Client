import { Table } from "antd";

const App = ({ columns, data, isLoading, onChange }) => {
  return (
    <>
      <div
        style={{
          marginBottom: 16,
        }}
      ></div>
      <Table
        onChange={onChange}
        loading={isLoading}
        columns={columns}
        dataSource={data}
      />
    </>
  );
};
export default App;
