import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import {
  getUserDataFromLocalStorage,
  selectCurrentUser,
} from "../features/auth/authSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(getUserDataFromLocalStorage());
    if (currentUser && currentUser?.role === "admin") {
      return navigate("/admin");
    }
    if (currentUser && currentUser?.role === "user") {
      return navigate("/user");
    }
  }, []);

  return (
    <div className="card text-center mx-auto">
      <div className="card-body">
        <h5 className="card-title fs-1">Blog Central App</h5>
        <p className="card-text">
          Welcome to Blog Central App. Please login or register to continue
        </p>

        <div className="d-flex gap-1 justify-content-center">
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
          <Link to="/register" className="btn btn-primary">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};
export default HomePage;