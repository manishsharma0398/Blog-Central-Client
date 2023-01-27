import { Link } from "react-router-dom";

const HomePage = () => {
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
