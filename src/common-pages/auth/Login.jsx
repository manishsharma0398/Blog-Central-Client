import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  login,
  selectUserError,
  selectUserStatus,
  selectCurrentUser,
} from "../../features/auth/authSlice";
import { selectProfileData } from "../../features/user/userSlice";

import Input from "../../components/Input";

const Login = () => {
  const loadingRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const passwordReset = location.state?.passwordReset;

  const notifyLoading = () => (loadingRef.current = toast.loading("Loging In"));

  const userError = useSelector(selectUserError);
  const userStatus = useSelector(selectUserStatus);
  const currentUser = useSelector(selectCurrentUser);
  const profile = useSelector(selectProfileData);

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
      await dispatch(login(values));
      toast.dismiss(loadingRef.current);
    },
  });

  useEffect(() => {
    if (passwordReset) {
      toast.success("Password Successfully changed. Please login to continue");
    }
  }, [passwordReset]);

  useEffect(() => {
    if (userStatus === "loading") {
      notifyLoading();
    }
    if (userStatus === "rejected") {
      toast.error(`${userError}`);
    }
    if (userStatus === "loggedIn") {
      toast.success("Logged In");
      if (currentUser.role === "admin") {
        return navigate("/admin");
      }
      if (!profile || profile === null || profile === undefined) {
        return navigate("/profile/update", {
          state: { profileAfterLogin: true },
        });
      } else {
        return navigate(from, { replace: true });
      }
    }
  }, [currentUser, userStatus, userError]);

  return (
    <div className="w-50 mx-auto h-100 py-5">
      <form onSubmit={formik.handleSubmit} className="card p-5">
        <h3 className="text-center mb-2">Login</h3>
        <p className="mb-4 text-center">Login to your Blog Central Account</p>

        {userError && <div className="error text-center">{userError}</div>}

        <Input
          id="email"
          label="Email address"
          type="email"
          placeholder="abc@xyz.com"
          value={formik.values.email}
          onChange={formik.handleChange("email")}
        />

        {formik.touched.email && formik.errors.email ? (
          <div className="text-danger">{formik.errors.email}</div>
        ) : null}

        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange("password")}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-danger">{formik.errors.password}</div>
        ) : null}

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
    </div>
  );
};
export default Login;
