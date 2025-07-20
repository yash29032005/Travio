import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import handlePayment from "../utils/payment";
import { jwtDecode } from "jwt-decode";

function PackageThirdpage() {
  const navigate = useNavigate();
  const type = "packages";

  const links = [
    { name: "Home", path: "/", type: "link" },
    { name: "Flights", path: "/flights", type: "link" },
    { name: "Trains", path: "/trains", type: "link" },
    { name: "Hotels", path: "/hotels", type: "link" },
    { name: "Packages", path: "/packages", type: "link" },
  ];

  const [packages, setPackage] = useState(null);
  const { id } = useParams();
  const [userid, setUserid] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/packages/${id}`)
      .then((response) => {
        setPackage(response.data);
      });

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Token not found");
      }
      const decode = jwtDecode(token);
      setUserid(decode.id);
    } catch (err) {
      console.log("something went wrong");
    }
  }, [id]);

  return (
    <>
      <Navbar links={links} />
      {packages ? (
        <div
          style={{ width: "100vw", height: "100%" }}
          className="d-flex flex-column flex-lg-row justify-content-center gap-5 mt-4 p-3"
        >
          <div
            style={{ height: "auto" }}
            className="col-lg-6 col-12 rounded-5 px-5"
          >
            <img
              style={{ width: "100%" }}
              className="rounded-5"
              src={`/${packages.image}`}
              alt="packageimage"
            />
            <p
              className="m-0 fw-bold fs-2"
              style={{
                fontFamily: "serif",
              }}
            >
              {packages.destination}
            </p>
            <p className="fw-bold">
              Rating:&nbsp;
              {"⭐".repeat(packages.rating)}
              {"☆".repeat(5 - packages.rating)}
            </p>
            <p className="fw-bold">Duration: {packages.duration}</p>
            <p className="fw-bold">Iternary: </p>
            {packages.itinerary.map((itinerarys, iindex) => (
              <div
                className="card text-bg-light mb-3"
                style={{ width: "100%" }}
                key={iindex}
              >
                <div className="card-header">Day {itinerarys.day}</div>
                <div className="card-body">
                  <h5 className="card-title">{itinerarys.title}</h5>
                  {itinerarys.points.map((point, pindex) => (
                    <ul className="card-text m-0" key={pindex}>
                      <li>{point}</li>
                    </ul>
                  ))}
                </div>
              </div>
            ))}
            <p className="fw-bold mt-3">Refund & Cancellation Policy: </p>
            <p className="m-0" style={{ color: "grey" }}>
              Free cancellation available up to 48 hours before trip start
            </p>
            <p className="m-0" style={{ color: "grey" }}>
              30% cancellation fee if cancelled within 48 hours
            </p>
            <p className="m-0" style={{ color: "grey" }}>
              No refund for same-day cancellations{" "}
            </p>
            <p style={{ color: "grey" }}>
              Partial refund possible on medical/emergency grounds
            </p>
            <p className="fw-bold mt-3">Safety & Cleanliness: </p>
            <p className="m-0" style={{ color: "grey" }}>
              Regular sanitization of hotels and vehicles
            </p>
            <p className="m-0" style={{ color: "grey" }}>
              Contactless check-in/check-out available
            </p>
            <p className="m-0" style={{ color: "grey" }}>
              Hygiene kits provided on arrival
            </p>
            <p style={{ color: "grey" }}>Contactless check-in/check-out</p>
          </div>
          <div
            style={{
              height: "100%",
              background: "var(--secondary-color)",
            }}
            className="col-lg-2 col-12 text-center p-3 rounded-5"
          >
            <h5 className="fw-bold text-center mb-4">Fare Summary</h5>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">Base Fare</span>
              <span className="text-dark">₹{packages.price}</span>
            </div>

            <hr className="my-2" />

            <div className="d-flex justify-content-between mb-4">
              <span className="text-success fw-semibold">Total Amount</span>
              <span className="text-success fw-semibold">
                ₹{packages.price}
              </span>
            </div>

            <button
              className="btn btn-primary w-100 rounded-pill"
              onClick={() =>
                handlePayment(
                  id,
                  packages.image,
                  type,
                  userid,
                  packages.destination,
                  packages.duration,
                  packages.price,
                  navigate
                )
              }
            >
              Confirm Booking
            </button>
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}
export default PackageThirdpage;
