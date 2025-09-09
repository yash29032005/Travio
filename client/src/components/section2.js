import { useState } from "react";
import { Link } from "react-router-dom";

function Section2() {
  const [activeTab, setActiveTab] = useState("flight");

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [travellers, setTravellers] = useState("1");
  const [date, setDate] = useState("");
  const [destination, setDestination] = useState("");
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");

  return (
    <div
      className="d-flex justify-content-center align-items-center p-4"
      style={{
        width: "100vw",
        background: "var(--primary-color)",
      }}
      id="Section2"
    >
      <div
        className="p-4 d-flex flex-column justify-content-center align-items-center text-black rounded-5 shadow-lg"
        style={{
          backgroundColor: "var(--secondary-color)",
          width: "100%",
          maxWidth: "900px",
        }}
      >
        {/* Tabs */}
        <div
          className="d-flex gap-4 mb-4 fw-bold"
          style={{ fontSize: "clamp(1rem, 2vw, 2rem)" }}
        >
          {["flight", "train", "hotel", "package"].map((tab) => (
            <span
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{ cursor: "pointer" }}
              className={`${
                activeTab === tab
                  ? "text-primary border-bottom border-2"
                  : "text-dark"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}s
            </span>
          ))}
        </div>

        {/* Form Container */}
        <div
          className="p-4 rounded-4 w-100"
          style={{ background: "var(--primary-color)" }}
        >
          {activeTab === "flight" && (
            <form className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Travellers</label>
                <input
                  type="number"
                  min={1}
                  value={travellers}
                  onChange={(e) => setTravellers(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">From</label>
                <input
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">To</label>
                <input
                  type="text"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-12">
                <Link
                  to={`/flights?from=${encodeURIComponent(
                    from
                  )}&to=${encodeURIComponent(
                    to
                  )}&travellers=${encodeURIComponent(travellers)}&date=${date}`}
                  className="text-decoration-none"
                >
                  <button type="button" className="btn btn-primary w-100">
                    Check Flights
                  </button>
                </Link>
              </div>
            </form>
          )}

          {activeTab === "train" && (
            <form className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Travellers</label>
                <input
                  type="number"
                  min={1}
                  value={travellers}
                  onChange={(e) => setTravellers(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">From</label>
                <input
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">To</label>
                <input
                  type="text"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-12">
                <Link
                  to={`/trains?from=${encodeURIComponent(
                    from
                  )}&to=${encodeURIComponent(
                    to
                  )}&travellers=${encodeURIComponent(travellers)}&date=${date}`}
                  className="text-decoration-none"
                >
                  <button type="button" className="btn btn-primary w-100">
                    Check Trains
                  </button>
                </Link>
              </div>
            </form>
          )}

          {activeTab === "hotel" && (
            <form className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Travellers</label>
                <input
                  type="number"
                  min={1}
                  value={travellers}
                  onChange={(e) => setTravellers(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Destination</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Check-In</label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={startdate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Check-Out</label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={enddate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-12">
                <Link
                  to={`/hotels?travellers=${encodeURIComponent(
                    travellers
                  )}&destination=${encodeURIComponent(
                    destination
                  )}&start=${encodeURIComponent(
                    startdate
                  )}&end=${encodeURIComponent(enddate)}`}
                  className="text-decoration-none"
                >
                  <button type="button" className="btn btn-primary w-100">
                    Check Hotels
                  </button>
                </Link>
              </div>
            </form>
          )}

          {activeTab === "package" && (
            <form className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Travellers</label>
                <input
                  type="number"
                  min={1}
                  value={travellers}
                  onChange={(e) => setTravellers(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Destination</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Check-In</label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={startdate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Check-Out</label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={enddate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-12">
                <Link
                  to={`/packages?travellers=${encodeURIComponent(
                    travellers
                  )}&destination=${encodeURIComponent(
                    destination
                  )}&start=${encodeURIComponent(
                    startdate
                  )}&end=${encodeURIComponent(enddate)}`}
                  className="text-decoration-none"
                >
                  <button type="button" className="btn btn-primary w-100">
                    Check Packages
                  </button>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Section2;
