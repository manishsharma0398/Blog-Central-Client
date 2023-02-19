import * as yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import Input from "../../components/Input";
import { resetPassword } from "../../features/auth/authSlice";

const ChangePassword = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const defaultSchemaFields = {
    password: yup.string().required("New Password is Required"),
    confirmPassword: yup.string().required("Confirm Password is Required"),
  };

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const schema = yup.object().shape(defaultSchemaFields);

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      setAuthError("");
      setIsLoading(true);

      const path = location.pathname.split("/")[1];
      console.log(path);

      let data;

      if (path === "reset-password") {
        data = await dispatch(
          resetPassword({ ...values, token: params.token })
        );
      }

      setIsLoading(false);
      if (data.error) {
        setAuthError(data.payload.message);
      } else {
        return navigate("/login", { state: { passwordReset: true } });
      }
    },
  });

  return (
    <>
      <div className="w-50 mx-auto h-100 py-5">
        <form onSubmit={formik.handleSubmit} className="card p-5">
          <h3 className="text-center mb-2">Reset Password</h3>
          <p className="mb-4 text-center">
            Change your Blog Central Account Password
          </p>

          {authError && <div className="error">{authError}</div>}

          {/* 
        <Input
          id="oldPassword"
          label="Current Password"
          type="password"
          placeholder="Current Password"
          value={oldPassword}
          onChange={onChange}
        /> */}

          <Input
            id="newPassword"
            label="New Password"
            type="password"
            placeholder="New Password"
            value={formik.values.password}
            onChange={formik.handleChange("password")}
          />

          {formik.touched.password && formik.errors.password && (
            <div className="error">{formik.errors.password}</div>
          )}

          <Input
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange("confirmPassword")}
          />

          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="error">{formik.errors.confirmPassword}</div>
          )}

          <button
            disabled={isLoading}
            type="submit"
            className="mt-3 btn btn-primary"
          >
            {isLoading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </>
  );
};
export default ChangePassword;
