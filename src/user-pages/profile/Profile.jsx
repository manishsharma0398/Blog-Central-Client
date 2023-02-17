import { useEffect } from "react";
import moment from "moment/moment";
import { Button, Descriptions, Image, Result } from "antd";
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

import "./profile.scss";

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
    <div className="user-profile-info">
      <Button
        className="my-3"
        onClick={() => navigate("update")}
        type="primary"
      >
        Edit Profile
      </Button>

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
            alt={user?.name}
            title={user?.name}
            src={user?.profilePic?.url || FALLBACK_PROFILE_PIC}
          />
        )}
      </div>

      <Descriptions
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
        <Descriptions.Item label="Mobile">{profile?.mobile}</Descriptions.Item>
        <Descriptions.Item label="Gender">
          {profile?.gender && capitalizeFirstLetter(profile?.gender)}
        </Descriptions.Item>
        <Descriptions.Item label="DOB">
          {!profile?.dateOfBirth ||
          profile?.dateOfBirth === null ||
          profile?.dateOfBirth === ""
            ? ""
            : moment(profile?.dateOfBirth).format("Do MMMM, YYYY")}
        </Descriptions.Item>
        <Descriptions.Item label="Address"></Descriptions.Item>
        <Descriptions.Item label="Country">
          {profile?.country}
        </Descriptions.Item>
        <Descriptions.Item label="State/Region">
          {profile?.stateOrRegion}
        </Descriptions.Item>
        <Descriptions.Item label="City">{profile?.city}</Descriptions.Item>
        <Descriptions.Item label="Zipcode">
          {profile?.zipCode}
        </Descriptions.Item>
        <Descriptions.Item label="Social Media Links">
          <div className="d-flex gap-3">
            {profile?.socialProfiles?.instagram && (
              <Link target="_blank" to={profile?.socialProfiles?.instagram}>
                <BsInstagram className="fs-4" color="#C13584" />
              </Link>
            )}
            {profile?.socialProfiles?.facebook && (
              <Link target="_blank" to={profile?.socialProfiles?.facebook}>
                <BsFacebook className="fs-4" color="#4267B2" />
              </Link>
            )}
            {profile?.socialProfiles?.linkedin && (
              <Link target="_blank" to={profile?.socialProfiles?.linkedin}>
                <BsLinkedin className="fs-4" color="#0e76a8" />
              </Link>
            )}
            {profile?.socialProfiles?.twitter && (
              <Link target="_blank" to={profile?.socialProfiles?.twitter}>
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
