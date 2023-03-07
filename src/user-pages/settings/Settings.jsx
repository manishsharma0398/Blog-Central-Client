import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { deleteUser, selectCurrentUserId } from "../../features/auth/authSlice";

import CustomModal from "../../components/common-components/CustomModal";

import "./settings.scss";

const Settings = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector(selectCurrentUserId);

  const showModal = () => {
    setOpenDeleteModal(true);
  };
  const hideModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteUser = async () => {
    const response = await dispatch(deleteUser(userId));

    setOpenDeleteModal(false);

    if (response.type === "auth/delete-user/fulfilled") {
      toast.warn("User Deleted");
    }
  };

  return (
    <>
      <h3>Delete User</h3>

      <div className="delete-user">
        <p>Delete User</p>
        <button onClick={() => showModal()} className="btn btn-danger">
          Delete User
        </button>
      </div>

      <CustomModal
        title="Are you sure to delete user ?"
        open={openDeleteModal}
        text="Everything related to you will be deleted and this process is irreversible. Are you sure, you want to continue ?"
        hideModal={hideModal}
        action={handleDeleteUser}
      />
    </>
  );
};
export default Settings;
