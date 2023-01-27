import { useState } from "react";
import { Link } from "react-router-dom";

import Input from "../../components/Input";

const Login = () => {
  const initialLoginData = {
    email: "",
    password: "",
  };

  const [loginInputs, setLoginInputs] = useState(initialLoginData);

  const { email, password } = loginInputs;

  const onChange = (e) => {
    setLoginInputs({
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
        <h3 className="text-center mb-2">Login</h3>
        <p className="mb-4 text-center">Login to your Blog Central Account</p>

        <Input
          id="email"
          label="Email address"
          type="email"
          placeholder="abc@xyz.com"
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

        <div className="small m-0 p-0 mb-3 d-flex justify-content-end">
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
