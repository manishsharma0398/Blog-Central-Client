import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import TableComponent from "../components/common-components/TableComponent";

import { getAllUsers, selectAllUsers } from "../features/user/userSlice";

const columns = [
  {
    title: "S.No",
    dataIndex: "slNo",
    key: "slNo",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  //   const status = useSelector(selectCustomerStatus);
  //   const error = useSelector(selectCustomerError);
  const allUsersMetaData = useSelector(selectAllUsers);
  const allUsersError = allUsersMetaData?.error;
  const allUsersStatus = allUsersMetaData?.status;
  const allUsers = allUsersMetaData?.users;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const data = [];
  for (let i = 0; i < allUsers?.length; i++) {
    const { _id, name, role, email } = allUsers[i];
    data.push({
      key: _id,
      slNo: i + 1,
      name,
      role,
      email,
      actions: <Link to={`/admin/users/${_id}`}>Go to profile</Link>,
    });
  }

  return (
    <>
      <h3 className="mb-4">Users</h3>
      <TableComponent
        isLoading={allUsersStatus === "loading"}
        columns={columns}
        data={data}
      />
    </>
  );
};
export default Customers;
