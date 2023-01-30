import { Outlet } from "react-router-dom";

import Navbar from "../Navbar";
import Footer from "../footer/Footer";

const Layout = () => {
  return (
    <div id="page-container">
      <Navbar />
      <div id="content">
        <div id="content-wrap" className="container">
          <Outlet />
        </div>
      </div>
      <div id="footer" className="py-3 box-shadow-top">
        <Footer />
      </div>
    </div>
  );
};
export default Layout;
