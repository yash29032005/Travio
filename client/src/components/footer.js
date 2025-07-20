import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div
        id="Footer"
        className="d-flex flex-column flex-lg-row justify-content-around align-items-center text-black"
        style={{
          height: "auto",
          width: "100vw",
          background: "var(--secondary-color)",
        }}
      >
        <div className="p-5">
          <p className="fs-2 ">Ultimate Trip Planner</p>
          <p className="mb-0">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui, vel?
            <br />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi,
            <br />
            commodi?
          </p>
          <small className="fs-7" style={{ color: "grey" }}>
            &copy; {new Date().getFullYear()} Your Company Name. All rights
            reserved.
          </small>
        </div>
        <div className="d-flex gap-5">
          <div className="d-flex flex-column align-items-center">
            <a
              className="text-black text-decoration-none mb-2"
              href="#Section1"
            >
              Home
            </a>
            <a
              className="text-black text-decoration-none mb-2"
              href="#Section2"
            >
              Book
            </a>
            <Link
              className="text-black text-decoration-none mb-2"
              to="/flights"
            >
              Flights
            </Link>
            <Link className="text-black text-decoration-none mb-2" to="/trains">
              Trains
            </Link>
            <Link className="text-black text-decoration-none mb-2" to="/hotels">
              Hotels
            </Link>
            <Link className="text-black text-decoration-none" to="/packages">
              Packages
            </Link>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <p className="text-center fs-5 m-0">Contact us</p>
            <hr className="mt-1 border border-black w-100" />
            <p className="text-center fs-7 m-0" style={{ color: "grey" }}>
              &#9743;+91 981236178
            </p>
            <p className="text-center fs-7 m-0 mt-1" style={{ color: "grey" }}>
              &#x1F4E7;Travio@gmail.com
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Footer;
