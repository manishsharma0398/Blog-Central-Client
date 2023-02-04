import { Spin } from "antd";

import "./loadingPage.scss";

const LoadingPage = () => {
  return (
    <div id="loading">
      <Spin size="large" />
    </div>
  );
};
export default LoadingPage;
