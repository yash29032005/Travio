import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import handlePayment from "../utils/payment";
import { jwtDecode } from "jwt-decode";

function FlightThirdpage() {
  const navigate = useNavigate();
  const type = "flights";

  const links = [
    { name: "Home", path: "/", type: "link" },
    { name: "Flights", path: "/flights", type: "link" },
    { name: "Trains", path: "/trains", type: "link" },
    { name: "Hotels", path: "/hotels", type: "link" },
    { name: "Packages", path: "/packages", type: "link" },
  ];

  const [flight, setFlight] = useState(null);
  const { id } = useParams();
  const [userid, setUserid] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/flights/${id}`)
      .then((response) => {
        setFlight(response.data);
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
      {flight ? (
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
              src={`/${flight.image}`}
              alt="flightimage"
            />
            <div
              className="m-0 text-center d-flex justify-content-around align-items-center"
              style={{
                fontFamily: "serif",
              }}
            >
              <div className="col-4 my-3">
                <p className="m-0 fw-bold fs-4 fs-md-1">{flight.from}</p>
                <p className="m-0" style={{ color: "grey" }}>
                  {flight.departureTime}
                </p>
                <p className="m-0" style={{ color: "grey" }}>
                  {flight.departureAirport}
                </p>
                <p className="m-0" style={{ color: "grey" }}>
                  {flight.departureTerminal}
                </p>
              </div>
              <div className="col-2">
                <p className="m-0" style={{ fontSize: "50px" }}>
                  →
                </p>
              </div>
              <div className="col-4">
                <p className="m-0 fw-bold fs-4 fs-md-1">{flight.to}</p>
                <p className="m-0" style={{ color: "grey" }}>
                  {flight.arivalTime}
                </p>
                <p className="m-0" style={{ color: "grey" }}>
                  {flight.arivalAirport}
                </p>
                <p className="m-0" style={{ color: "grey" }}>
                  {flight.arivalTerminal}
                </p>
              </div>
            </div>
            <p className="fw-bold">
              Rating:&nbsp;
              {"⭐".repeat(flight.rating)}
              {"☆".repeat(5 - flight.rating)}
            </p>
            <p className="fw-bold">Description: </p>
            <p style={{ color: "grey" }}>{flight.description}</p>
            <p className="fw-bold">Baggage: </p>
            <p className="m-0" style={{ color: "grey" }}>
              Cabin Baggage: 7 kg
            </p>
            <p className="m-0" style={{ color: "grey" }}>
              Check-in Baggage: 15 kg
            </p>
            <p style={{ color: "grey" }}>Personal Item: 1 small item allowed</p>
            <p className="fw-bold">Refund & Cancellation: </p>
            <p className="m-0" style={{ color: "grey" }}>
              Ticket Type: Refundable
            </p>
            <p className="m-0" style={{ color: "grey" }}>
              Cancellation Fee: ₹800 (if cancelled before 24 hours)
            </p>
            <p className="m-0" style={{ color: "grey" }}>
              No-Show Penalty: ₹1500
            </p>
            <p style={{ color: "grey" }}>
              Rescheduling: ₹500 + fare difference
            </p>
            <p className="fw-bold">Amenities: </p>
            <p className="m-0" style={{ color: "grey" }}>
              Complimentary Snacks
            </p>
            <p className="m-0" style={{ color: "grey" }}>
              Charging Ports Available
            </p>
            <p className="m-0" style={{ color: "grey" }}>
              Seat Selection: Optional (from ₹200)
            </p>
            <p style={{ color: "grey" }}>In-flight Wi-Fi: Available</p>
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
              <span className="text-dark">₹{flight.price}</span>
            </div>

            <hr className="my-2" />

            <div className="d-flex justify-content-between mb-4">
              <span className="text-success fw-semibold">Total Amount</span>
              <span className="text-success fw-semibold">₹{flight.price}</span>
            </div>

            <button
              className="btn btn-primary w-100 rounded-pill"
              onClick={() =>
                handlePayment(
                  id,
                  flight.image,
                  type,
                  userid,
                  flight.from,
                  flight.to,
                  flight.price,
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
export default FlightThirdpage;
