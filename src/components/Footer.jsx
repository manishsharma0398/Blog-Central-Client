import { Link } from "react-router-dom";
import { AiTwotoneHeart } from "react-icons/ai";

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
      <div className="text-center d-flex gap-4 justify-content-center">
        <p className="m-0 p-0">Follow me</p>
        <ul
          style={{ listStyle: "none" }}
          className="d-flex gap-3 justify-content-center m-0 p-0"
        >
          <li>
            <Link to="https://www.facebook.com/man.sharma.7921/">Facebook</Link>
          </li>
          <li>
            <Link to="https://www.instagram.com/manis_rijal/">Instagram</Link>
          </li>
          <li>
            <Link to="https://twitter.com/WebDevManish">Twitter</Link>
          </li>
          <li>
            <Link to="https://www.linkedin.com/in/manish-sharma0398/">
              Linkedin
            </Link>
          </li>
          <li>
            <Link to="https://github.com/manishsharma0398">Github</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Footer;
