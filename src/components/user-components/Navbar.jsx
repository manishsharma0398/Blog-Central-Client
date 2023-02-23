import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";

import {
  logout,
  selectUserStatus,
  selectCurrentUser,
} from "../../features/auth/authSlice";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);
  const currentUserStatus = useSelector(selectUserStatus);

  const logoutUser = async (e) => {
    e.preventDefault();
    await dispatch(logout());
  };

  // useEffect(() => {
  //   if (currentUserStatus === "loggedOut") {
  //     return navigate("/login");
  //   }
  // }, [currentUserStatus]);

  const { isLoggedIn, isUser } = useAuth();

  return (
    <nav id="navbar" className="navbar navbar-expand-lg bg-white sticky-top">
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

        {
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {isLoggedIn && isUser && (
                <>
                  <li className="nav-item">
                    <NavLink to="/" className="nav-link">
                      Home
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to={`/profile/${currentUser?.email}`}
                      className="nav-link"
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/user/write" className="nav-link">
                      Write New Blog
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
                      {currentUser?.name}
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/user/settings">
                          Settings
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link
                          onClick={logoutUser}
                          className="dropdown-item"
                          to="#"
                        >
                          Log out
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              {!isLoggedIn && !isUser && (
                <>
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
                </>
              )}
            </ul>
          </div>
        }
      </div>
    </nav>
  );
};
export default Navbar;
