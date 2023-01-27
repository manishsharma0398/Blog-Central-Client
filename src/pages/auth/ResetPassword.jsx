import { useState } from "react";

import Input from "../../components/Input";

const ChangePassword = () => {
  const initialData = {
    oldPassword: "",
    newPassword: "",
    confPassword: "",
  };

  const [changePasswordInputs, setChangePasswordInputs] = useState(initialData);

  const { confPassword, newPassword, oldPassword } = changePasswordInputs;

  const onChange = (e) => {
    setChangePasswordInputs({
      ...loginInputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-50 mx-auto h-100 py-5">
      <form onSubmit={handleFormSubmit} className="card p-5">
        <h3 className="text-center mb-2">Reset Password</h3>
        <p className="mb-4 text-center">
          Change your Blog Central Account Password
        </p>

        <Input
          id="oldPassword"
          label="Current Password"
          type="password"
          placeholder="Current Password"
          value={oldPassword}
          onChange={onChange}
        />

        <Input
          id="newPassword"
          label="New Password"
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={onChange}
        />

        <Input
          id="confPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          value={confPassword}
          onChange={onChange}
        />

        <button type="submit" className="btn btn-primary">
          Reset Password
        </button>
      </form>
    </div>
  );
};
export default ChangePassword;
