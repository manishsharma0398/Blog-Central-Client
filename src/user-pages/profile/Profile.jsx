import { useEffect } from "react";
import moment from "moment/moment";
import { Button, Image } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

import {
  getUserProfileById,
  selectProfileData,
  selectProfileError,
  selectProfileStatus,
} from "../../features/user/userSlice";
import {
  selectCurrentUserId,
  selectCurrentUser,
} from "../../features/auth/authSlice";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

import LoadingPage from "../../components/common-components/loading-page/LoadingPage";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectCurrentUser);
  const profile = useSelector(selectProfileData);
  const userId = useSelector(selectCurrentUserId);
  const profileError = useSelector(selectProfileError);
  const profileStatus = useSelector(selectProfileStatus);

  useEffect(() => {
    dispatch(getUserProfileById(userId));
  }, []);

  return profileStatus === "loading" ? (
    <LoadingPage />
  ) : (
    <div>
      <Button
        className="my-3"
        onClick={() => navigate("update")}
        type="primary"
      >
        Edit Profile
      </Button>

      <div style={{ height: "200px", maxWidth: "300px" }}>
        <Image
          height={200}
          width="100%"
          style={{
            maxHeight: "200px",
            objectFit: "cover",
            width: "100%",
          }}
          src={user?.profilePic?.url}
          alt="Manish Sharma"
        />
      </div>

      <p className="mt-3">Mobile : {profile?.mobile}</p>
      <p>Gender : {capitalizeFirstLetter(profile?.gender)}</p>
      <p>DOB: {moment(profile?.dateOfBirth).format("Do MMMM, YYYY")}</p>
      <p>Country : {profile?.country}</p>
      <p>State/Region : {profile?.stateOrRegion}</p>
      <p>City : {profile?.city}</p>
      <p>Zipcode : {profile?.zipCode}</p>
      <div className="d-flex gap-3">
        {profile?.socialProfiles?.instagram && (
          <p>
            <Link target="_blank" to={profile?.socialProfiles?.instagram}>
              <BsInstagram className="fs-4" color="#C13584" />
            </Link>
          </p>
        )}
        {profile?.socialProfiles?.facebook && (
          <p>
            <Link target="_blank" to={profile?.socialProfiles?.facebook}>
              <BsFacebook className="fs-4" color="#4267B2" />
            </Link>
          </p>
        )}
        {profile?.socialProfiles?.linkedin && (
          <p>
            <Link target="_blank" to={profile?.socialProfiles?.linkedin}>
              <BsLinkedin className="fs-4" color="#0e76a8" />
            </Link>
          </p>
        )}
        {profile?.socialProfiles?.twitter && (
          <p>
            <Link target="_blank" to={profile?.socialProfiles?.twitter}>
              <BsTwitter className="fs-4" color="#1DA1F2" />
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};
export default Profile;
