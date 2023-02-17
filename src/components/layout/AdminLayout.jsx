import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineDashboard,
  AiOutlineLogout,
} from "react-icons/ai";

import { FaListAlt } from "react-icons/fa";
import { ImBlogger, ImBlog } from "react-icons/im";
import { BiCategory, BiCategoryAlt } from "react-icons/bi";
import { BsFillCartFill } from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineCategory } from "react-icons/md";

import {
  logout,
  selectCurrentUser,
  selectUserStatus,
} from "../../features/auth/authSlice";

import "react-toastify/dist/ReactToastify.css";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const currentUser = useSelector(selectCurrentUser);
  const userStatus = useSelector(selectUserStatus);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userStatus === "loggedOut") {
      return navigate("/login");
    }
  }, [userStatus]);

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
          onClick={async ({ key, keyPath }) => {
            if (key == "logout") {
              await dispatch(logout());
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
              key: "blogs",
              icon: <ImBlogger className="fs-4" />,
              label: "Blogs",
              children: [
                {
                  key: "blogs/all",
                  icon: <BiCategory className="fs-4" />,
                  label: "All",
                },
                {
                  key: "blogs/user",
                  icon: <ImBlog className="fs-4" />,
                  label: "By Users",
                },
              ],
            },
            {
              key: "categories",
              icon: <MdOutlineCategory className="fs-4" />,
              label: "Category",
              children: [
                {
                  key: "categories/add",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Add Category",
                },
                {
                  key: "categories/all",
                  icon: <BiCategory className="fs-4" />,
                  label: "Category List",
                },
              ],
            },
            {
              key: "logout",
              icon: <AiOutlineLogout className="fs-4" />,
              label: "Logout",
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
                  style={{ objectFit: "cover", height: "32px", width: "32px" }}
                  src={currentUser?.profilePic?.url}
                  alt={currentUser?.name}
                  title={currentUser?.name}
                />
              </div>
              <div className="d-flex flex-column gap-1">
                <h5 className="m-0 p-0 lh-1 fs-6 d-block">
                  {currentUser?.name}
                </h5>
                <p className="m-0 p-0 lh-1 small">{currentUser?.email}</p>
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
            autoClose={4000}
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
