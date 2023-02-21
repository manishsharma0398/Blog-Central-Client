import { useEffect } from "react";
import moment from "moment/moment";
import { Button, Descriptions, Image, Result } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

import {
  selectProfileData,
  getAProfile,
  selectProfileStatus,
  selectProfilePicError,
  selectProfilePicStatus,
} from "../../features/user/userSlice";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { FALLBACK_PROFILE_PIC } from "../../utils/variables";
import useAuth from "../../hooks/useAuth";

import LoadingPage from "../../components/common-components/loading-page/LoadingPage";

import "./profile.scss";

const Profile = ({ email, username, userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectCurrentUser);
  const profile = useSelector(selectProfileData);
  const profileStatus = useSelector(selectProfileStatus);

  const profilePicStatus = useSelector(selectProfilePicStatus);
  const profilePicError = useSelector(selectProfilePicError);

  useEffect(() => {
    if (email || username || userId) {
      dispatch(getAProfile({ email, username, userId }));
    }
  }, []);

  const { isAdmin, isLoggedIn, isUser } = useAuth();

  return profileStatus === "loading" ? (
    <LoadingPage />
  ) : profileStatus === "error" ? (
    <Result
      status="500"
      title="Sorry, something went wrong."
      extra={
        <Button
          onClick={() => {
            dispatch(getAProfile({ email, username, userId }));
          }}
        >
          Reload Data
        </Button>
      }
    />
  ) : (
    <div className="user-profile-info">
      {isLoggedIn && isUser && profile?.ownProfile && (
        <Button
          className="my-3"
          onClick={() => navigate("/profile/update")}
          type="primary"
        >
          Edit Profile
        </Button>
      )}

      <div style={{ maxHeight: "300px", maxWidth: "300px", margin: "auto" }}>
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
            alt={profile?.name}
            title={profile?.name}
            src={profile?.profilePic?.url || FALLBACK_PROFILE_PIC}
          />
        )}
      </div>

      <Descriptions
        className="mt-3"
        title="User Info"
        bordered
        column={{
          xxl: 1,
          xl: 1,
          lg: 1,
          md: 1,
          sm: 1,
          xs: 1,
        }}
      >
        <Descriptions.Item label="Name">{profile?.name}</Descriptions.Item>
        <Descriptions.Item label="Mobile">
          {profile?.profile?.mobile}
        </Descriptions.Item>
        <Descriptions.Item label="Gender">
          {profile?.profile?.gender &&
            capitalizeFirstLetter(profile?.profile?.gender)}
        </Descriptions.Item>
        <Descriptions.Item label="DOB">
          {!profile?.profile?.dateOfBirth ||
          profile?.profile?.dateOfBirth === null ||
          profile?.profile?.dateOfBirth === ""
            ? ""
            : moment(profile?.profile?.dateOfBirth).format("Do MMMM, YYYY")}
        </Descriptions.Item>
        <Descriptions.Item label="Address"></Descriptions.Item>
        <Descriptions.Item label="Country">
          {profile?.profile?.country}
        </Descriptions.Item>
        <Descriptions.Item label="State/Region">
          {profile?.profile?.stateOrRegion}
        </Descriptions.Item>
        <Descriptions.Item label="City">
          {profile?.profile?.city}
        </Descriptions.Item>
        <Descriptions.Item label="Zipcode">
          {profile?.profile?.zipCode}
        </Descriptions.Item>
        <Descriptions.Item label="Social Media Links">
          <div className="d-flex gap-3">
            {profile?.profile?.socialProfiles?.instagram && (
              <Link
                target="_blank"
                to={profile?.profile?.socialProfiles?.instagram}
              >
                <BsInstagram className="fs-4" color="#C13584" />
              </Link>
            )}
            {profile?.profile?.socialProfiles?.facebook && (
              <Link
                target="_blank"
                to={profile?.profile?.socialProfiles?.facebook}
              >
                <BsFacebook className="fs-4" color="#4267B2" />
              </Link>
            )}
            {profile?.profile?.socialProfiles?.linkedin && (
              <Link
                target="_blank"
                to={profile?.profile?.socialProfiles?.linkedin}
              >
                <BsLinkedin className="fs-4" color="#0e76a8" />
              </Link>
            )}
            {profile?.profile?.socialProfiles?.twitter && (
              <Link
                target="_blank"
                to={profile?.profile?.socialProfiles?.twitter}
              >
                <BsTwitter className="fs-4" color="#1DA1F2" />
              </Link>
            )}
          </div>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};
export default Profile;
