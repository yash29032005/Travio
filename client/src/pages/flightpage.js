import axios from "axios";
import Filters from "../components/filters";
import { useCallback, useContext, useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useSearchParams } from "react-router-dom";
import _ from "lodash";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import Modalforflight from "../utils/modalforflight";

function ShowFlight() {
  const links = [
    { name: "Home", path: "/", type: "link" },
    { name: "Flights", path: "/flights", type: "link" },
    { name: "Trains", path: "/trains", type: "link" },
    { name: "Hotels", path: "/hotels", type: "link" },
    { name: "Packages", path: "/packages", type: "link" },
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const [from, setFrom] = useState(searchParams.get("from") || "");
  const [to, setTo] = useState(searchParams.get("to") || "");
  const [travellers, setTravellers] = useState(
    searchParams.get("travellers") || 1
  );
  const [date, setDate] = useState(searchParams.get("date") || "");

  useEffect(() => {
    setSearchParams({
      from,
      to,
      travellers,
      date,
    });
  }, [from, to, travellers, date, setSearchParams]);

  const [flight, setFlight] = useState([]);
  const handleSubmit = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/flights`, {
        params: { from, to },
      })
      .then((response) => {
        setFlight(response.data);
      })
      .catch((error) => {
        console.error("Error fetching flights:", error);
      });
  }, [from, to]);

  useEffect(() => {
    handleSubmit();
  }, [handleSubmit]);

  //Sorting
  const [sort, setSort] = useState("");
  let sorted = flight;
  if (sort === "pricehl") {
    sorted = _.orderBy(flight, ["price"], ["desc"]);
  } else if (sort === "pricelh") {
    sorted = _.orderBy(flight, ["price"], ["asc"]);
  } else if (sort === "rating") {
    sorted = _.orderBy(flight, ["rating"], ["desc"]);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFlights = sorted.slice(indexOfFirstItem, indexOfLastItem);
  const { admin } = useContext(UserContext);
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Navbar links={links} />
      <div
        className="d-flex flex-column justify-content-center align-items-center px-4"
        style={{
          height: "100%",
          width: "100%",
          background: "var(--primary-color)",
        }}
      >
        <div
          id="input"
          style={{ width: "100%" }}
          className="d-flex flex-column flex-lg-row justify-content-center gap-2 p-3 mb-4"
        >
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="From"
            className="form-control-sm"
          />
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="To"
            className="form-control-sm"
          />
          <input
            type="number"
            value={travellers}
            onChange={(e) => setTravellers(e.target.value)}
            placeholder="Travellers"
            className="form-control-sm"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Date"
            className="form-control-sm"
          />
          <button className="btn btn-primary" onClick={handleSubmit}>
            Search Flights
          </button>
          {admin ? (
            <button
              className="btn btn-primary"
              onClick={() => setModalShow(true)}
            >
              +
            </button>
          ) : null}
          <Modalforflight
            show={modalShow}
            onHide={() => setModalShow(false)}
            handleSubmit={handleSubmit}
          />
        </div>
        <div
          className="d-flex flex-column flex-lg-row justify-content-around"
          style={{ width: "100%", height: "100%" }}
        >
          <div
            id="Filters"
            style={{ background: "var(--secondary-color)", height: "100%" }}
            className="col-12 col-lg-2 p-3 rounded-4 d-flex flex-lg-column mt-3"
          >
            <Filters sort={sort} setSort={setSort} />
          </div>
          <div
            style={{ height: "100%" }}
            className="col-12 col-lg-9 mb-3 rounded-4"
          >
            {currentFlights && currentFlights.length > 0 ? (
              currentFlights.map((flights, index) => (
                <div
                  className="d-flex gap-3 p-4 rounded-4 m-3"
                  style={{
                    background: "var(--secondary-color)",
                    height: "18rem",
                  }}
                  id="card"
                  key={index}
                >
                  <div className="col-5">
                    <img
                      src={flights.image}
                      className="rounded-4"
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      alt="flightimage"
                    />
                  </div>
                  <div className="col-7">
                    <p
                      className="m-0 fw-bold"
                      style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}
                    >
                      {flights.from}
                      <span style={{ fontSize: "30px" }}>&#8594;</span>
                      {flights.to}
                    </p>
                    <p
                      className="m-0"
                      style={{ fontSize: "clamp(0.875rem, 2vw, 1.125rem)" }}
                    >
                      {flights.description}
                    </p>
                    <p>
                      {"⭐".repeat(flights.rating)}
                      {"☆".repeat(5 - flights.rating)}
                    </p>
                    <p
                      className="fw-bold"
                      style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}
                    >
                      &#x20B9;{flights.price}
                    </p>
                    <Link to={`/flights/${flights._id}`}>
                      <button
                        style={{ fontSize: "clamp(0.85rem, 2vw, 1rem)" }}
                        className="btn btn-primary"
                      >
                        Book Now
                      </button>
                    </Link>
                    {admin ? (
                      <button
                        className="btn btn-danger ms-3"
                        onClick={async () => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this flight?"
                            )
                          ) {
                            try {
                              await axios.delete(
                                `${process.env.REACT_APP_API_URL}/flights/${flights._id}`
                              );
                              handleSubmit(); // Re-fetch flights after deletion
                            } catch (error) {
                              alert("Error deleting flight");
                              console.error("Error deleting flight:", error);
                            }
                          }
                        }}
                      >
                        Delete
                      </button>
                    ) : null}
                  </div>
                </div>
              ))
            ) : (
              <h5>No results found...</h5>
            )}
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                {Array.from(
                  { length: Math.ceil(sorted.length / itemsPerPage) },
                  (_, i) => (
                    <li
                      key={i}
                      className={`btn btn-sm mx-1 ${
                        currentPage === i + 1
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </li>
                  )
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
export default ShowFlight;
