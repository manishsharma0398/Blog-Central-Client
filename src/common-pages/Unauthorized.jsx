import useAuth from "../hooks/useAuth";

import ResultPage from "../components/common-components/ResultPage";

const Unauthorized = () => {
  const { role } = useAuth();

  return (
    <ResultPage
      status="403"
      title="Unauthorized"
      subTitle="Sorry, you are not authorized to access this page."
      btnText="Go Back"
      goToLink={role === "admin" ? "/admin" : "/"}
    />
  );
};
export default Unauthorized;
