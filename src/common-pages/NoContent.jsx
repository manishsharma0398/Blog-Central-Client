import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NoContent = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="Page do not exist"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button
          onClick={() => {
            navigate("/");
          }}
          type="primary"
        >
          Back Home
        </Button>
      }
    />
  );
};
export default NoContent;
