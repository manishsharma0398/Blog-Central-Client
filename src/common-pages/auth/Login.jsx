import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

import {
  login,
  reset,
  selectCurrentUser,
  selectUserError,
  selectUserStatus,
} from "../../features/auth/authSlice";

import Input from "../../components/Input";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const loadingRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notifyLoading = () => (loadingRef.current = toast.loading("Loging In"));

  const currentUser = useSelector(selectCurrentUser);
  const userStatus = useSelector(selectUserStatus);
  const userError = useSelector(selectUserError);

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
      await dispatch(reset());
      await dispatch(login(values));
      toast.dismiss(loadingRef.current);
    },
  });

  useEffect(() => {
    if (userStatus === "loading") {
      notifyLoading();
    }
    if (userStatus === "rejected") {
      toast.error(`${userError}`);
    }
    if (userStatus === "loggedIn") {
      console.log(currentUser);
      toast.success("Logged In");
      if (currentUser.role === "admin") {
        return navigate("/admin");
      } else {
        return navigate("/user");
      }
    }
  }, [currentUser, userStatus, userError]);

  // useEffect(() => {
  //   if (currentUser && isSuccess && !isError) {
  //     console.log("cooool");
  //     navigate("/dashboard");
  //   }
  // }, [isSuccess, isError, currentUser]);

  return (
    <div className="w-50 mx-auto h-100 py-5">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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