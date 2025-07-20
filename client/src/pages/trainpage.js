import axios from "axios";
import Filters from "../components/filters";
import { useCallback, useContext, useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useSearchParams } from "react-router-dom";
import _ from "lodash";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import Modalfortrain from "../utils/modalfortrain";

function ShowTrain() {
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

  const [train, setTrain] = useState([]);
  const handleSubmit = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/trains`, {
        params: { from, to },
      })
      .then((response) => {
        setTrain(response.data);
      })
      .catch((error) => {
        console.error("Error fetching trains:", error);
      });
  }, [from, to]);

  useEffect(() => {
    handleSubmit();
  }, [handleSubmit]);

  //Sorting
  const [sort, setSort] = useState("");
  let sorted = train;
  if (sort === "pricehl") {
    sorted = _.orderBy(train, ["price"], ["desc"]);
  } else if (sort === "pricelh") {
    sorted = _.orderBy(train, ["price"], ["asc"]);
  } else if (sort === "rating") {
    sorted = _.orderBy(train, ["rating"], ["desc"]);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTrains = sorted.slice(indexOfFirstItem, indexOfLastItem);
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
            Search Trains
          </button>
          {admin ? (
            <button
              className="btn btn-primary"
              onClick={() => setModalShow(true)}
            >
              +
            </button>
          ) : null}
          <Modalfortrain
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
            {currentTrains && currentTrains.length > 0 ? (
              currentTrains.map((trains, index) => (
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
                      src={trains.image}
                      className="rounded-4"
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      alt="trainimage"
                    />
                  </div>
                  <div className="col-7">
                    <p
                      className="m-0 fw-bold"
                      style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}
                    >
                      {trains.from}
                      <span style={{ fontSize: "30px" }}>&#8594;</span>
                      {trains.to}
                    </p>
                    <p
                      className="m-0"
                      style={{ fontSize: "clamp(0.875rem, 2vw, 1.125rem)" }}
                    >
                      {trains.description}
                    </p>
                    <p>
                      {"⭐".repeat(trains.rating)}
                      {"☆".repeat(5 - trains.rating)}
                    </p>
                    <p
                      className="fw-bold"
                      style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}
                    >
                      &#x20B9;{trains.price}
                    </p>
                    <Link to={`/trains/${trains._id}`}>
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
                              "Are you sure you want to delete this train?"
                            )
                          ) {
                            try {
                              await axios.delete(
                                `${process.env.REACT_APP_API_URL}/trains/${trains._id}`
                              );
                              handleSubmit();
                            } catch (error) {
                              alert("Error deleting train");
                              console.error("Error deleting train:", error);
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
export default ShowTrain;
