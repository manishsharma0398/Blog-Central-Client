import { useDispatch, useSelector } from "react-redux";

import { deleteUser, selectCurrentUserId } from "../../features/auth/authSlice";

import "./settings.scss";

const Settings = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectCurrentUserId);

  const deleteUserHandler = async () => {
    await dispatch(deleteUser(userId));
  };

  return (
    <>
      <h3>Delete User</h3>

      <div className="delete-user">
        <p>Delete User</p>
        <button onClick={deleteUserHandler} className="btn btn-danger">
          Delete User
        </button>
      </div>
    </>
  );
};
export default Settings;
