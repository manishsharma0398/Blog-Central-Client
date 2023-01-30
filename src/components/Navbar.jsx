import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../features/auth/authSlice";

const Navbar = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <nav id="navbar" className="navbar navbar-expand-md bg-white sticky-top">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand fs-4">
          Blog Central
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        {currentUser && (
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/blogs" className="nav-link">
                  Blogs
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/draft" className="nav-link">
                  Draft
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/write" className="nav-link">
                  Write
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Manish
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/settings">
                      Settings
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Log out
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        )}

        {!currentUser && (
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">
                  Register
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
