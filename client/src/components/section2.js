import { useState } from "react";
import { Link } from "react-router-dom";

function Section2() {
  const [showFlight, setShowFlight] = useState(true);
  const [showTrain, setShowTrain] = useState(false);
  const [showHotel, setShowHotel] = useState(false);
  const [showPackage, setShowPackage] = useState(false);

  function openFlight() {
    setShowFlight(true);
    setShowTrain(false);
    setShowHotel(false);
    setShowPackage(false);
  }
  function openTrain() {
    setShowFlight(false);
    setShowTrain(true);
    setShowHotel(false);
    setShowPackage(false);
  }
  function openHotel() {
    setShowFlight(false);
    setShowTrain(false);
    setShowHotel(true);
    setShowPackage(false);
  }
  function openPackage() {
    setShowFlight(false);
    setShowTrain(false);
    setShowHotel(false);
    setShowPackage(true);
  }

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [travellers, setTravellers] = useState("");
  const [date, setDate] = useState("");
  const [destination, setDestination] = useState("");
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");

  return (
    <>
      <div
        className=" d-flex justify-content-center align-items-center p-4"
        style={{
          width: "100vw",
          background: "var(--primary-color)",
        }}
        id="Section2"
      >
        <div
          className="p-4 d-flex flex-column justify-content-center align-items-center text-black rounded-5"
          style={{
            backgroundColor: "var(--secondary-color)",
            height: "auto",
            width: "100%",
          }}
        >
          <div
            className="d-flex gap-2 mb-2"
            style={{ fontSize: "clamp(1rem, 2vw, 10rem)" }}
          >
            <Link
              className="link-primary text-black text-decoration-none"
              onClick={openFlight}
            >
              Flights
            </Link>
            |
            <Link
              className="link-primary text-black text-decoration-none"
              onClick={openTrain}
            >
              Trains
            </Link>
            |
            <Link
              className="link-primary text-black text-decoration-none"
              onClick={openHotel}
            >
              Hotels
            </Link>
            |
            <Link
              className="link-primary text-black text-decoration-none"
              onClick={openPackage}
            >
              Packages
            </Link>
          </div>
          <div
            className="p-3 d-flex justify-content-center align-items-center rounded-5"
            style={{
              background: "var(--primary-color)",
              width: "100%",
              height: "auto",
            }}
          >
            {showFlight ? (
              <form className="w-75">
                <div className="mb-3">
                  <label htmlFor="inputtraveller" className="form-label">
                    Travellers
                  </label>
                  <input
                    type="number"
                    onChange={(e) => setTravellers(e.target.value)}
                    id="inputtraveller"
                    className="form-control"
                    defaultValue={1}
                    min={0}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputfrom" className="form-label">
                    From
                  </label>
                  <input
                    onChange={(e) => setFrom(e.target.value)}
                    type="text"
                    id="inputfrom"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputto" className="form-label">
                    To
                  </label>
                  <input
                    onChange={(e) => setTo(e.target.value)}
                    type="text"
                    id="inputto"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputdate" className="form-label">
                    Date
                  </label>
                  <input
                    type="Date"
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    id="inputdate"
                    className="form-control"
                  />
                </div>
                <Link
                  to={`/flights?from=${encodeURIComponent(
                    from
                  )}&to=${encodeURIComponent(
                    to
                  )}&travellers=${encodeURIComponent(travellers)}&date=${date}`}
                  className="text-decoration-none text-white"
                >
                  <button className="btn btn-primary w-100">
                    Check Flights
                  </button>
                </Link>
              </form>
            ) : null}
            {showTrain ? (
              <form className="w-75">
                <div className="mb-3">
                  <label htmlFor="inputtraveller" className="form-label">
                    Travellers
                  </label>
                  <input
                    type="number"
                    onChange={(e) => setTravellers(e.target.value)}
                    id="inputtraveller"
                    className="form-control"
                    defaultValue={1}
                    min={0}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputfrom" className="form-label">
                    From
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setFrom(e.target.value)}
                    id="inputfrom"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputto" className="form-label">
                    To
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setTo(e.target.value)}
                    id="inputto"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputdate" className="form-label">
                    Date
                  </label>
                  <input
                    type="Date"
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    id="inputdate"
                    className="form-control"
                  />
                </div>
                <Link
                  to={`/trains?from=${encodeURIComponent(
                    from
                  )}&to=${encodeURIComponent(
                    to
                  )}&travellers=${encodeURIComponent(travellers)}&date=${date}`}
                  className="text-decoration-none text-white"
                >
                  <button className="btn btn-primary w-100">
                    Check Trains
                  </button>
                </Link>
              </form>
            ) : null}
            {showHotel ? (
              <form className="w-75">
                <div className="mb-3">
                  <label htmlFor="inputtraveller" className="form-label">
                    Travellers
                  </label>
                  <input
                    type="number"
                    onChange={(e) => setTravellers(e.target.value)}
                    id="inputtraveller"
                    className="form-control"
                    defaultValue={1}
                    min={0}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputfrom" className="form-label">
                    Destination
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setDestination(e.target.value)}
                    id="inputfrom"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputdate" className="form-label">
                    Check-In date
                  </label>
                  <input
                    type="Date"
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    id="inputdate"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputdate" className="form-label">
                    Check-Out date
                  </label>
                  <input
                    type="Date"
                    onChange={(e) => setEndDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    id="inputdate"
                    className="form-control"
                  />
                </div>
                <Link
                  to={`/hotels?travellers=${encodeURIComponent(
                    travellers
                  )}&destination=${encodeURIComponent(
                    destination
                  )}&start=${encodeURIComponent(
                    startdate
                  )}&end=${encodeURIComponent(enddate)}`}
                  className="text-decoration-none text-white"
                >
                  <button className="btn btn-primary w-100">
                    Check Hotels
                  </button>
                </Link>
              </form>
            ) : null}
            {showPackage ? (
              <form className="w-75">
                <div className="mb-3">
                  <label htmlFor="inputtraveller" className="form-label">
                    Travellers
                  </label>
                  <input
                    type="number"
                    onChange={(e) => setTravellers(e.target.value)}
                    id="inputtraveller"
                    className="form-control"
                    defaultValue={1}
                    min={0}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputfrom" className="form-label">
                    Destination
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setDestination(e.target.value)}
                    id="inputfrom"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputdate" className="form-label">
                    Check-In date
                  </label>
                  <input
                    type="Date"
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    id="inputdate"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputdate" className="form-label">
                    Check-Out date
                  </label>
                  <input
                    type="Date"
                    onChange={(e) => setEndDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    id="inputdate"
                    className="form-control"
                  />
                </div>
                <Link
                  to={`/packages?travellers=${encodeURIComponent(
                    travellers
                  )}&destination=${encodeURIComponent(
                    destination
                  )}&start=${encodeURIComponent(
                    startdate
                  )}&end=${encodeURIComponent(enddate)}`}
                  className="text-decoration-none text-white"
                >
                  <button className="btn btn-primary w-100">
                    Check Packages
                  </button>
                </Link>
              </form>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
export default Section2;
