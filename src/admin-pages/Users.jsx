import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import TableComponent from "../components/common-components/TableComponent";
// import {
//   getAllUsers,
//   selectCustomerData,
//   selectCustomerError,
//   selectCustomerStatus,
// } from "../features/customers/customersSlice";

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
    defaultSortOrder: "descend",
    sorter: (a, b) => a.name.length - b.name.length,
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
    title: "Mobile",
    dataIndex: "mobile",
    key: "mobile",
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  //   const status = useSelector(selectCustomerStatus);
  //   const error = useSelector(selectCustomerError);
  //   const customers = useSelector(selectCustomerData);

  const navigate = useNavigate();

  useEffect(() => {
    // dispatch(getAllUsers());
  }, []);

  const data = [];
  //   for (let i = 0; i < customers?.length; i++) {
  //     data.push({
  //       key: customers[i]._id,
  //       slNo: i + 1,
  //       name: customers[i].firstname + " " + customers[i].lastname,
  //       role: customers[i].role,
  //       email: customers[i].email,
  //       mobile: customers[i].mobile,
  //     });
  //   }

  return (
    <>
      <h3 className="mb-4">Customers</h3>
      <TableComponent
        // isLoading={status === "loading"}
        columns={columns}
        data={data}
      />
    </>
  );
};
export default Customers;
