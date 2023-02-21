import * as yup from "yup";
import moment from "moment";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Button, Image, Result, Spin } from "antd";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  getAProfile,
  updateProfile,
  selectProfileData,
  selectProfileError,
  selectProfileStatus,
  updateProfilePicture,
  deleteProfilePicture,
  selectProfilePicError,
  selectProfilePicStatus,
} from "../../features/user/userSlice";
import {
  selectUserStatus,
  selectCurrentUser,
} from "../../features/auth/authSlice";
import { FALLBACK_PROFILE_PIC } from "../../utils/variables";

import CustomModal from "../../components/common-components/CustomModal";
import CustomInput from "../../components/common-components/CustomInput";
import CustomDropdown from "../../components/common-components/CustomDropdown";
import LoadingPage from "../../components/common-components/loading-page/LoadingPage";

import "./updtProfile.scss";

const UpdateProfile = () => {
  const loadingToast = useRef();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const notifyLoading = () =>
    (loadingToast.current = toast.loading(`Profile updating`));

  const user = useSelector(selectCurrentUser);
  const profile = useSelector(selectProfileData);
  const userStatus = useSelector(selectUserStatus);
  const profileError = useSelector(selectProfileError);
  const profileStatus = useSelector(selectProfileStatus);

  const profilePicStatus = useSelector(selectProfilePicStatus);
  const profilePicError = useSelector(selectProfilePicError);

  useEffect(() => {
    if (location?.state?.profileAfterLogin) {
    } else {
      dispatch(getAProfile({ userId: user?._id }));
    }
  }, []);

  useEffect(() => {
    if (profileStatus === "updated") {
      toast.success("Profile Updated");
      return navigate(`/profile/${user.email}`);
    }
  }, [profileStatus]);

  const schema = yup.object().shape({
    mobile: yup.number().required("Mobile Number required"),
    gender: yup.string().lowercase().required("Gender is required"),
    dateOfBirth: yup.date().required("DOB is required"),
    country: yup.string().lowercase().required("Country is required"),
    stateOrRegion: yup.string().lowercase().required("State/Region  required"),
    city: yup.string().lowercase().required("City is required"),
    zipCode: yup.number().required("Zipcode required"),
    twitter: yup.string(),
    facebook: yup.string(),
    linkedin: yup.string(),
    instagram: yup.string(),
    profilePic: yup.string(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      mobile: profile?.profile?.mobile || "",
      gender: profile?.profile?.gender || "",
      dateOfBirth:
        !profile?.profile?.dateOfBirth ||
        profile?.profile?.dateOfBirth === null ||
        profile?.profile?.dateOfBirth === ""
          ? ""
          : moment(profile?.profile?.dateOfBirth).format().split("T")[0] || "",
      country: profile?.profile?.country || "",
      stateOrRegion: profile?.profile?.stateOrRegion || "",
      city: profile?.profile?.city || "",
      zipCode: profile?.profile?.zipCode || "",
      twitter: profile?.profile?.socialProfiles?.twitter || "",
      facebook: profile?.profile?.socialProfiles?.facebook || "",
      linkedin: profile?.profile?.socialProfiles?.linkedin || "",
      instagram: profile?.profile?.socialProfiles?.instagram || "",
      profilePic: profile?.profile?.user?.profilePic?.url || "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      notifyLoading();
      await dispatch(updateProfile(values));
      toast.dismiss(loadingToast.current);
    },
  });

  const imageOnChangeHandler = async (e) => {
    if (e.target.files) {
      // formik.setFieldValue("profilePic", e.target.files[0]);

      await dispatch(
        updateProfilePicture({
          fileToUpload: e.target.files[0],
          userId: user?._id,
        })
      );
    }
  };

  const showModal = () => {
    setOpenDeleteModal(true);
  };
  const hideModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDelProfilePic = async () => {
    setOpenDeleteModal(false);

    const isUrl = new RegExp(/^[a-z][a-z0-9+.-]*:/).test(
      formik?.values?.profilePic
    );

    if (isUrl) {
      await dispatch(deleteProfilePicture(user?._id));
    } else {
      formik.setFieldValue("profilePic", "");
    }
  };

  const genders = ["male", "female", "transgender"];

  return profileStatus === "loading" || userStatus === "loading" ? (
    <LoadingPage />
  ) : profileStatus === "error" ? (
    <Result
      status="500"
      title="Sorry, something went wrong."
      extra={
        <Button
          onClick={() => {
            dispatch(getAProfile({ userId: user?._id }));
          }}
        >
          Reload Data
        </Button>
      }
    />
  ) : (
    <>
      <CustomModal
        title="Delete your profile pic, Really ?"
        open={openDeleteModal}
        hideModal={hideModal}
        action={handleDelProfilePic}
      />
      <form onSubmit={formik.handleSubmit} className="profile-form my-5">
        <h3 className="text-center mb-2">{user?.name?.split(" ")}'s Profile</h3>

        {profileError && (
          <div className="error text-center">{profileError}</div>
        )}

        <div
          style={{
            // height: "350px",
            width: "350px",
            maxHeight: "100%",
            maxWidth: "100%",
          }}
          className="d-flex flex-column justify-content-center align-items-center mb-3 mx-auto"
        >
          {profilePicStatus === "deleting" ||
          profilePicStatus === "updating" ? (
            <Spin />
          ) : profilePicError === "rejected" ? (
            <div className="error">Something went wrong</div>
          ) : (
            <Image
              style={{
                maxHeight: "340px",
                objectFit: "cover",
                width: "100%",
                maxWidth: "340px",
                height: "100%",
                padding: "10px",
              }}
              fallback={FALLBACK_PROFILE_PIC}
              alt={profile?.profile?.user?.name}
              title={profile?.profile?.user?.name}
              src={
                new RegExp(/^[a-z][a-z0-9+.-]*:/).test(
                  formik?.values?.profilePic
                )
                  ? formik?.values?.profilePic
                  : formik?.values?.profilePic === "" ||
                    !formik?.values?.profilePic === null ||
                    !formik?.values?.profilePic ||
                    formik.values.profilePic === undefined
                  ? ""
                  : URL.createObjectURL(formik?.values?.profilePic)
              }
            />
          )}
        </div>
        <div className="d-flex flex-wrap gap-3 justify-content-center">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              document.querySelector("#profilePic").click();
            }}
          >
            Change Profile Picture
          </button>

          <input
            type="file"
            id="profilePic"
            style={{ display: "none" }}
            onChange={imageOnChangeHandler}
          />

          <button
            onClick={() => {
              user?.profilePic?.url ? showModal() : null;
            }}
            type="button"
            className="btn btn-danger"
          >
            Delete Profile Picture
          </button>
        </div>

        <CustomInput
          id="mobile"
          label="Mobile"
          type="number"
          placeholder="Mobile Number"
          value={formik.values.mobile}
          onChange={formik.handleChange("mobile")}
          error={formik.errors.mobile}
          touched={formik.touched.mobile}
        />
        <CustomDropdown
          id="gender"
          placeholder="Select Gender"
          value={formik.values.gender}
          onChange={formik.handleChange("gender")}
          touched={formik.touched.gender}
          error={formik.errors.gender}
          options={genders}
        />
        <CustomInput
          type="date"
          id="dateOfBirth"
          label="Date of Birth"
          value={formik.values.dateOfBirth}
          onChange={formik.handleChange("dateOfBirth")}
          error={formik.errors.dateOfBirth}
          touched={formik.touched.dateOfBirth}
        />
        <CustomInput
          id="country"
          label="Country"
          value={formik.values.country}
          onChange={formik.handleChange("country")}
          error={formik.errors.country}
          touched={formik.touched.country}
        />
        <CustomInput
          id="stateOrRegion"
          label="State/Region"
          value={formik.values.stateOrRegion}
          onChange={formik.handleChange("stateOrRegion")}
          error={formik.errors.stateOrRegion}
          touched={formik.touched.stateOrRegion}
        />
        <CustomInput
          id="city"
          label="City"
          value={formik.values.city}
          onChange={formik.handleChange("city")}
          error={formik.errors.city}
          touched={formik.touched.city}
        />
        <CustomInput
          id="zipCode"
          label="Pincode/Zipcode"
          value={formik.values.zipCode}
          onChange={formik.handleChange("zipCode")}
          error={formik.errors.zipCode}
          touched={formik.touched.zipCode}
        />
        <CustomInput
          id="twitter"
          label="Twitter"
          value={formik.values.twitter}
          onChange={formik.handleChange("twitter")}
          error={formik.errors.twitter}
          touched={formik.touched.twitter}
        />
        <CustomInput
          id="facebook"
          label="Facebook"
          value={formik.values.facebook}
          onChange={formik.handleChange("facebook")}
          error={formik.errors.facebook}
          touched={formik.touched.facebook}
        />
        <CustomInput
          id="linkedin"
          label="Linkedin"
          value={formik.values.linkedin}
          onChange={formik.handleChange("linkedin")}
          error={formik.errors.linkedin}
          touched={formik.touched.linkedin}
        />
        <CustomInput
          id="instagram"
          label="Instagram"
          value={formik.values.instagram}
          onChange={formik.handleChange("instagram")}
          error={formik.errors.instagram}
          touched={formik.touched.instagram}
        />

        <button type="submit" className="btn btn-primary mt-3 w-100">
          Update Profile
        </button>
      </form>
    </>
  );
};

export default UpdateProfile;
