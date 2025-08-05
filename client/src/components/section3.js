import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Section3() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/packages`)
      .then((res) => {
        setPackages(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching packages:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div id="section3" className="container py-5">
      {/* Heading */}
      <div className="text-center mb-5">
        <h2 className="fw-bold" style={{ fontFamily: "serif" }}>
          Top Destinations
        </h2>
        <p className="text-muted">Discover amazing places to visit</p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="row g-4">
          {packages.slice(0, 3).map((pkg) => (
            <div className="col-12 col-sm-12 col-md-6 col-lg-4" key={pkg._id}>
              <div
                className="card h-100 border-0 shadow-sm rounded-4"
                style={{ background: "var(--secondary-color)" }}
              >
                <img
                  src={pkg.image}
                  alt={pkg.destination}
                  className="card-img-top rounded-top-4"
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold fs-5">{pkg.destination}</h5>
                  <p className="card-text text-muted small flex-grow-1">
                    {pkg.description}
                  </p>
                  <Link to={`/packages/${pkg._id}`} className="mt-3">
                    <button className="btn btn-outline-primary w-100">
                      View Package
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Section3;
