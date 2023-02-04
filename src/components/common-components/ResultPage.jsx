import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const ResultPage = ({ status, title, subTitle, goToLink, btnText, icon }) => {
  const navigate = useNavigate();
  return (
    <Result
      icon={icon}
      status={status || "error"}
      title={title}
      subTitle={subTitle}
      extra={
        <Button
          onClick={() => {
            navigate(goToLink);
          }}
          type="primary"
        >
          {btnText}
        </Button>
      }
    />
  );
};

export default ResultPage;
