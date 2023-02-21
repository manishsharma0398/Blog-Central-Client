import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  register,
  selectCurrentUser,
  selectUserError,
  selectUserStatus,
} from "../../features/auth/authSlice";

import CustomInput from "../../components/common-components/CustomInput";

const Register = () => {
  const loadingRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notifyLoading = () => (loadingRef.current = toast.loading("Loging In"));

  const userError = useSelector(selectUserError);
  const userStatus = useSelector(selectUserStatus);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (userStatus === "rejected") {
      toast.error(`${userError}`);
    }
    if (userStatus === "registered") {
      toast.success("Account Created");

      return navigate("/login");
    }
  }, [currentUser, userStatus, userError]);

  const schema = yup.object().shape({
    fullName: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Enter valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      console.log(values);
      notifyLoading();
      await dispatch(register(values));
      toast.dismiss(loadingRef.current);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="card register form">
      <h3 className="text-center mb-2">Register</h3>
      <p className="mb-4 text-center">Register to your Blog Central Account</p>
      {userError && <div className="error">{userError}</div>}
      <CustomInput
        id="name"
        label="Full Name"
        error={formik.errors.name}
        value={formik.values.name}
        touched={formik.touched.name}
        onChange={formik.handleChange("name")}
      />
      <CustomInput
        id="email"
        type="email"
        label="Email address"
        error={formik.errors.email}
        value={formik.values.email}
        touched={formik.touched.email}
        onChange={formik.handleChange("email")}
        helpText="We'll never share your email with anyone else."
      />
      <CustomInput
        id="password"
        type="password"
        label="Password"
        error={formik.errors.password}
        value={formik.values.password}
        touched={formik.touched.password}
        onChange={formik.handleChange("password")}
      />
      <CustomInput
        id="confirmPassword"
        type="password"
        label="Confirm password"
        error={formik.errors.confirmPassword}
        value={formik.values.confirmPassword}
        touched={formik.touched.confirmPassword}
        onChange={formik.handleChange("confirmPassword")}
      />

      <button type="submit" className="btn btn-primary my-3">
        Register
      </button>
      <Link to="/login">
        <div className="small m-0 p-0">Already have an account? Login</div>
      </Link>
    </form>
  );
};
export default Register;
