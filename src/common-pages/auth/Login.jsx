import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  login,
  selectUserError,
  selectUserStatus,
} from "../../features/auth/authSlice";

import CustomInput from "../../components/common-components/CustomInput";
import LoadingPage from "../../components/common-components/loading-page/LoadingPage";

const Login = () => {
  const loadingRef = useRef(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const passwordReset = location.state?.passwordReset;

  const notifyLoading = () => (loadingRef.current = toast.loading("Loging In"));

  const userError = useSelector(selectUserError);
  const userStatus = useSelector(selectUserStatus);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Enter valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      notifyLoading();
      await dispatch(login(values));
      toast.dismiss(loadingRef.current);
    },
  });

  useEffect(() => {
    if (passwordReset) {
      toast.success("Password Successfully changed. Please login to continue");
    }
  }, [passwordReset]);

  return userStatus === "loading" ? (
    <LoadingPage />
  ) : (
    <form onSubmit={formik.handleSubmit} className="card login form">
      <h3 className="text-center mb-2">Login</h3>
      <p className="mb-4 text-center">Login to your Blog Central Account</p>

      {userError && <div className="error text-center">{userError}</div>}

      <CustomInput
        id="email"
        type="email"
        label="Email address"
        error={formik.errors.email}
        value={formik.values.email}
        touched={formik.touched.email}
        onChange={formik.handleChange}
      />

      <CustomInput
        id="password"
        type="password"
        label="Password"
        error={formik.errors.password}
        value={formik.values.password}
        touched={formik.touched.password}
        onChange={formik.handleChange}
      />

      <div
        className={`small m-0 p-0 d-flex justify-content-end mb-3 ${
          !formik.errors.password && "mt-2"
        }`}
      >
        <Link to="/forgot-password">Forgot Password</Link>
      </div>

      <button type="submit" className="btn btn-primary">
        Login
      </button>

      <Link to="/register">
        <div className="small m-0 p-0 mt-3">
          Don't have an account? Register
        </div>
      </Link>
    </form>
  );
};
export default Login;
