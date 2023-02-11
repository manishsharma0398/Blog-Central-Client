import { useEffect } from "react";
import moment from "moment/moment";
import { Button, Image, Result } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

import {
  selectProfileData,
  getUserProfileById,
  selectProfileStatus,
  selectProfilePicError,
  selectProfilePicStatus,
} from "../../features/user/userSlice";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { FALLBACK_PROFILE_PIC } from "../../utils/variables";

import LoadingPage from "../../components/common-components/loading-page/LoadingPage";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectCurrentUser);
  const profile = useSelector(selectProfileData);
  const profileStatus = useSelector(selectProfileStatus);

  const profilePicStatus = useSelector(selectProfilePicStatus);
  const profilePicError = useSelector(selectProfilePicError);

  useEffect(() => {
    dispatch(getUserProfileById(user?._id));
  }, []);

  return profileStatus === "loading" ? (
    <LoadingPage />
  ) : profileStatus === "error" ? (
    <Result
      status="500"
      title="Sorry, something went wrong."
      extra={
        <Button
          onClick={() => {
            dispatch(getUserProfileById(user?._id));
          }}
        >
          Reload Data
        </Button>
      }
    />
  ) : (
    <div>
      <Button
        className="my-3"
        onClick={() => navigate("update")}
        type="primary"
      >
        Edit Profile
      </Button>

      <div style={{ maxHeight: "300px", maxWidth: "300px" }}>
        {profilePicStatus === "deleting" || profilePicStatus === "updating" ? (
          <Spin />
        ) : profilePicError === "rejected" ? (
          <div className="error">Something went wrong</div>
        ) : (
          <Image
            width={280}
            height={280}
            style={{
              objectFit: "cover",
              padding: "10px",
            }}
            alt={user?.name}
            title={user?.name}
            src={user?.profilePic?.url || FALLBACK_PROFILE_PIC}
          />
        )}
      </div>

      <p className="mt-3">Mobile : {profile?.mobile}</p>
      <p>
        Gender : {profile?.gender && capitalizeFirstLetter(profile?.gender)}
      </p>
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
