import { useState } from "react";

import Input from "../../components/Input";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-50 mx-auto h-100 py-5">
      <form onSubmit={handleFormSubmit} className="card p-5">
        <h3 className="text-center mb-2">Forgot Password</h3>
        <p className="mb-4 text-center">
          Reset Your Blog Central Account Password
        </p>

        <Input
          id="email"
          label="Email address"
          type="email"
          placeholder="abc@xyz.com"
          helpText="An email will be sent to this email address"
          value={email}
          onChange={onChange}
        />

        <button type="submit" className="btn btn-primary">
          Send Email
        </button>
      </form>
    </div>
  );
};
export default ForgotPassword;
