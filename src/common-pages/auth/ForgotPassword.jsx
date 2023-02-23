import * as yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import { forgotPassword } from "../../features/auth/authSlice";

import CustomInput from "../../components/common-components/CustomInput";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Enter valid email")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setEmailSent("");

      const data = await dispatch(forgotPassword(values));

      if (data.error) {
        formik.errors.email = data.payload.message;
      } else {
        formik.resetForm();
        setEmailSent(data.payload.message);
      }

      setIsLoading(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="card form forgot-password">
      <h3 className="text-center mb-2">Forgot Password</h3>
      <p className="mb-4 text-center">
        Reset Your Blog Central Account Password
      </p>

      {emailSent && <div className="text-success">{emailSent}</div>}

      <CustomInput
        id="email"
        label="Email address"
        type="email"
        helpText="An email will be sent to this email address"
        value={formik.values.email}
        onChange={formik.handleChange("email")}
        error={formik.errors.email}
        touched={formik.touched.email}
        errorOnTop={true}
      />

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
          "Send Email"
        )}
      </button>
    </form>
  );
};
export default ForgotPassword;
