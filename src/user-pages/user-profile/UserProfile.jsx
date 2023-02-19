import { useParams } from "react-router-dom";

import Profile from "../profile/Profile";
import MyBlogs from "../MyBlogs";
import useAuth from "../../hooks/useAuth";

import "./user-profile.scss";

const UserProfile = () => {
  const path = useParams();

  const { isLoggedIn, isUser } = useAuth();

  return (
    <div className="user-profile-page">
      <div className="profile">
        <Profile email={path?.username} />
      </div>
      {isLoggedIn && isUser && <MyBlogs email={path?.username} />}
    </div>
  );
};
export default UserProfile;
