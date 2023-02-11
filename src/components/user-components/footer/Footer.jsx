import { Link } from "react-router-dom";
import { AiTwotoneHeart } from "react-icons/ai";

import "./footer.scss";
import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
} from "react-icons/bs";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="container text-center d-flex flex-column gap-2">
      <p className="m-0">
        © Copyright 2023 {year > 2023 && `- ${year}`} Blog Central App
      </p>
      <p className="m-0">
        Developed and Created With <AiTwotoneHeart className="text-danger" /> by{" "}
        <Link to="#">Manish Sharma</Link>
      </p>
      <div className="text-center d-flex gap-4 justify-content-center footer-links">
        <ul
          style={{ listStyle: "none" }}
          className="d-flex gap-3 justify-content-center m-0 p-0 footer-social-links"
        >
          <li>
            <Link to="https://www.facebook.com/man.sharma.7921/">
              <BsFacebook className="fs-5" color="#4267B2" />
            </Link>
          </li>
          <li>
            <Link to="https://www.instagram.com/manis_rijal/">
              <BsInstagram className="fs-5" color="#C13584" />
            </Link>
          </li>
          <li>
            <Link to="https://twitter.com/WebDevManish">
              <BsTwitter className="fs-5" color="#1DA1F2" />
            </Link>
          </li>
          <li>
            <Link to="https://www.linkedin.com/in/manish-sharma0398/">
              <BsLinkedin className="fs-5" color="#0e76a8" />
            </Link>
          </li>
          <li>
            <Link to="https://github.com/manishsharma0398">
              <BsGithub className="fs-5" color="black" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Footer;
