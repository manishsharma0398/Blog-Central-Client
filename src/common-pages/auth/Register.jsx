import { useState } from "react";
import { Link } from "react-router-dom";

import Input from "../../components/Input";

const Register = () => {
  const initialRegistrationData = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [registrationData, setRegistrationData] = useState(
    initialRegistrationData
  );

  const { fullName, email, password, confirmPassword } = registrationData;

  const onChange = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-50 mx-auto h-100 py-5">
      <form onSubmit={handleFormSubmit} className="card p-5">
        <h3 className="text-center mb-2">Register</h3>
        <p className="mb-4 text-center">
          Register to your Blog Central Account
        </p>
        <Input
          id="fullName"
          label="Full Name"
          type="text"
          placeholder="Manish Sharma"
          value={fullName}
          onChange={onChange}
        />
        <Input
          id="email"
          label="Email address"
          type="email"
          placeholder="abc@xyz.com"
          helpText="We'll never share your email with anyone else."
          value={email}
          onChange={onChange}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
        />
        <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={onChange}
        />
        <button type="submit" className="btn btn-primary">
          Register
        </button>
        <Link to="/login">
          <div className="small m-0 p-0 mt-3">
            Already have an account? Login
          </div>
        </Link>
      </form>
    </div>
  );
};
export default Register;
