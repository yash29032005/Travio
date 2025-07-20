import axios from "axios";
import Filters from "../components/filters";
import { useCallback, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/navbar";
import _ from "lodash";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import Modalforpackage from "../utils/modalforpackage";

function ShowPackage() {
  const links = [
    { name: "Home", path: "/", type: "link" },
    { name: "Flights", path: "/flights", type: "link" },
    { name: "Trains", path: "/trains", type: "link" },
    { name: "Hotels", path: "/hotels", type: "link" },
    { name: "Packages", path: "/packages", type: "link" },
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [travellers, setTravellers] = useState(
    searchParams.get("travellers") || 1
  );
  const [start, setStart] = useState(searchParams.get("start") || "");
  const [end, setEnd] = useState(searchParams.get("end") || "");

  useEffect(() => {
    setSearchParams({
      destination,
      travellers,
      start,
      end,
    });
  }, [destination, travellers, start, end, setSearchParams]);

  const [packages, setPackage] = useState([]);
  const handleSubmit = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/packages`, {
        params: { destination },
      })
      .then((response) => {
        setPackage(response.data);
      });
  }, [destination]);

  useEffect(() => {
    handleSubmit();
  }, [handleSubmit]);
  //Sorting
  const [sort, setSort] = useState("");
  let sorted = packages;
  if (sort === "pricehl") {
    sorted = _.orderBy(packages, ["price"], ["desc"]);
  } else if (sort === "pricelh") {
    sorted = _.orderBy(packages, ["price"], ["asc"]);
  } else if (sort === "rating") {
    sorted = _.orderBy(packages, ["rating"], ["desc"]);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPackages = sorted.slice(indexOfFirstItem, indexOfLastItem);
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
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="form-control-sm"
          />
          <input
            type="number"
            placeholder="Travellers"
            value={travellers}
            onChange={(e) => setTravellers(e.target.value)}
            className="form-control-sm"
          />
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            placeholder="Start Date"
            className="form-control-sm"
          />
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            placeholder="End Date"
            className="form-control-sm"
          />
          <button className="btn btn-primary" onClick={handleSubmit}>
            Search Hotels
          </button>
          {admin ? (
            <button
              className="btn btn-primary"
              onClick={() => setModalShow(true)}
            >
              +
            </button>
          ) : null}
          <Modalforpackage
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
            {currentPackages && currentPackages.length > 0 ? (
              currentPackages.map((packagess, index) => (
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
                      src={packagess.image}
                      alt="packageimage"
                      className="rounded-4"
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="col-7">
                    <p
                      className="m-0 fw-bold"
                      style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}
                    >
                      {packagess.destination}
                    </p>
                    <p
                      className="m-0"
                      style={{ fontSize: "clamp(0.875rem, 2vw, 1.125rem)" }}
                    >
                      {packagess.description}
                    </p>
                    <p>
                      {"⭐".repeat(packagess.rating)}
                      {"☆".repeat(5 - packagess.rating)}
                    </p>
                    <p
                      className="fw-bold"
                      style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}
                    >
                      &#x20B9;{packagess.price}
                    </p>
                    <Link to={`/packages/${packagess._id}`}>
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
                              "Are you sure you want to delete this package?"
                            )
                          ) {
                            try {
                              await axios.delete(
                                `${process.env.REACT_APP_API_URL}/packages/${packagess._id}`
                              );
                              handleSubmit();
                            } catch (error) {
                              alert("Error deleting package");
                              console.error("Error deleting package:", error);
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
export default ShowPackage;
