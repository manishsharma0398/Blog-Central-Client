import { useState } from "react";
import { Layout, Menu } from "antd";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Outlet, useNavigate } from "react-router-dom";

import { selectCurrentUser } from "../../features/auth/authSlice";

import {
  AiOutlineDashboard,
  AiOutlineBgColors,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsFillCartPlusFill, BsFillCartFill } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { FaListAlt } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";

const { Header, Sider, Content } = Layout;

import "react-toastify/dist/ReactToastify.css";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const currentUser = useSelector(selectCurrentUser);

  const navigate = useNavigate();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="fs-5 p-0 m-0">
            <span className="sm-logo">A.P</span>
            <span className="lg-logo">Admin Panel</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key == "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "users",
              icon: <HiOutlineUserGroup className="fs-4" />,
              label: "Users",
            },
            {
              key: "coupon",
              icon: <BsFillCartFill className="fs-4" />,
              label: "Coupons",
              children: [
                {
                  key: "add-coupon",
                  icon: <BsFillCartPlusFill className="fs-4" />,
                  label: "Add a coupon",
                },
                {
                  key: "coupon-list",
                  icon: <BsFillCartPlusFill className="fs-4" />,
                  label: "Coupon List",
                },
              ],
            },
            {
              key: "category",
              icon: <BsFillCartFill className="fs-4" />,
              label: "Category",
              children: [
                {
                  key: "add-category",
                  icon: <BiCategory className="fs-4" />,
                  label: "Category",
                },
                {
                  key: "category-list",
                  icon: <BiCategory className="fs-4" />,
                  label: "Category List",
                },
              ],
            },
            {
              key: "colors",
              icon: <BsFillCartFill className="fs-4" />,
              label: "Colours",
              children: [
                {
                  key: "add-colour",
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "Colour",
                },
                {
                  key: "colour-list",
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "Colour List",
                },
              ],
            },
            {
              key: "product",
              icon: <BsFillCartFill className="fs-4" />,
              label: "Catalog",
              children: [
                {
                  key: "add-product",
                  icon: <BsFillCartPlusFill className="fs-4" />,
                  label: "Add a Product",
                },
                {
                  key: "product-list",
                  icon: <BsFillCartPlusFill className="fs-4" />,
                  label: "Product List",
                },
              ],
            },
            {
              key: "orders",
              icon: <FaListAlt className="fs-4" />,
              label: "Orders",
            },
            {
              key: "enquiry",
              icon: <FaListAlt className="fs-4" />,
              label: "Enquiry",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between pe-5"
          style={{ padding: 0, background: "#fff" }}
        >
          <button
            className="trigger border-0"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <AiOutlineRight /> : <AiOutlineLeft />}
          </button>

          <div className="d-flex gap-3 align-items-center">
            <div className="position-relative">
              <IoMdNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>
            <div className="d-flex gap-3 align-items-center">
              <div className="w-100">
                <img
                  style={{ objectFit: "cover" }}
                  height="32px"
                  width="32px"
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
              </div>
              <div className="d-flex flex-column gap-1">
                <h5 className="m-0 p-0 lh-1 fs-6 d-block">
                  {/* {currentUser.firstname + " " + currentUser.lastname} */}
                  {currentUser.name}
                </h5>
                <p className="m-0 p-0 lh-1 small">{currentUser.email}</p>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;