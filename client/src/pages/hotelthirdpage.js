import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import handlePayment from "../utils/payment";
import { jwtDecode } from "jwt-decode";

function HotelThirdpage() {
  const navigate = useNavigate();
  const type = "hotels";

  const links = [
    { name: "Home", path: "/", type: "link" },
    { name: "Flights", path: "/flights", type: "link" },
    { name: "Trains", path: "/trains", type: "link" },
    { name: "Hotels", path: "/hotels", type: "link" },
    { name: "Packages", path: "/packages", type: "link" },
  ];

  const [hotel, setHotel] = useState(null);
  const { id } = useParams();
  const [userid, setUserid] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/hotels/${id}`)
      .then((response) => setHotel(response.data));

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
      {hotel ? (
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
              src={`/${hotel.image}`}
              alt="hotelimage"
            />
            <p
              className="m-0 fw-bold fs-2"
              style={{
                fontFamily: "serif",
              }}
            >
              {hotel.destination}
            </p>
            <p>{hotel.location}</p>
            <p className="fw-bold">Room-type: {hotel.room}</p>
            <p className="fw-bold">Check-in: {hotel.checkin}</p>
            <p className="fw-bold">Check-out: {hotel.checkout}</p>
            <p className="fw-bold">
              Rating:&nbsp;
              {"⭐".repeat(hotel.rating)}
              {"☆".repeat(5 - hotel.rating)}
            </p>
            <p className="fw-bold">Description: {hotel.description}</p>

            <p className="fw-bold">Amenities: </p>
            <div className="d-flex flex-wrap gap-2">
              <text className="border border-dark rounded-pill p-2">
                Free Wi-Fi{" "}
              </text>
              <text className="border border-dark rounded-pill p-2">
                Complimentary Breakfast
              </text>
              <text className="border border-dark rounded-pill p-2">
                Air Conditioning
              </text>
              <text className="border border-dark rounded-pill p-2">
                Flat-screen TV
              </text>
              <text className="border border-dark rounded-pill p-2">
                Mini Fridge
              </text>
              <text className="border border-dark rounded-pill p-2">
                Tea/Coffee Maker
              </text>
              <text className="border border-dark rounded-pill p-2">
                In-room Safe
              </text>
              <text className="border border-dark rounded-pill p-2">
                Work Desk
              </text>
              <text className="border border-dark rounded-pill p-2">
                Room Service (24x7)
              </text>
            </div>
            <p className="fw-bold mt-3">Refund & Cancellation: </p>
            <p className="m-0" style={{ color: "grey" }}>
              Free Cancellation up to 24 hours before check-in
            </p>
            <p className="m-0" style={{ color: "grey" }}>
              Cancellation Fee: ₹1,000 if within 24 hours
            </p>
            <p style={{ color: "grey" }}>Personal Item: 1 small item allowed</p>
            <p className="fw-bold mt-3">Safety & Cleanliness: </p>
            <p className="m-0" style={{ color: "grey" }}>
              Daily housekeeping
            </p>
            <p className="m-0" style={{ color: "grey" }}>
              Sanitized rooms between bookings
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
              <span className="text-dark">₹{hotel.price}</span>
            </div>

            <hr className="my-2" />

            <div className="d-flex justify-content-between mb-4">
              <span className="text-success fw-semibold">Total Amount</span>
              <span className="text-success fw-semibold">₹{hotel.price}</span>
            </div>

            <button
              className="btn btn-primary w-100 rounded-pill"
              onClick={() =>
                handlePayment(
                  id,
                  hotel.image,
                  type,
                  userid,
                  hotel.destination,
                  hotel.location,
                  hotel.price,
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
export default HotelThirdpage;
