import { Button, Result } from "antd";

const NoContent = ({ title, message, btnText, goToLink }) => {
  return (
    <Result
      status="404"
      title={title || "404"}
      subTitle={message || "Sorry, the page you visited does not exist."}
      extra={
        <Button goToLink={goToLink} type="primary">
          {btnText}
        </Button>
      }
    />
  );
};
export default NoContent;
