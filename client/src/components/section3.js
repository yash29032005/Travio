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
        <h2
          className="fw-bold display-6"
          style={{ fontFamily: "Georgia, serif" }}
        >
          ✈️ Top Destinations
        </h2>
        <p className="text-muted fs-5">
          Discover breathtaking places tailored just for you
        </p>
        <div
          className="mx-auto mb-4"
          style={{
            width: "80px",
            height: "4px",
            background: "var(--primary-color)",
            borderRadius: "2px",
          }}
        ></div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Fetching destinations...</p>
        </div>
      ) : (
        <div className="row g-4">
          {packages.slice(0, 3).map((pkg) => (
            <div className="col-12 col-sm-12 col-md-6 col-lg-4" key={pkg._id}>
              <div
                className="card h-100 border-0 shadow-lg rounded-4 overflow-hidden transition-all"
                style={{
                  background: "var(--secondary-color)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                <div className="overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.destination}
                    className="card-img-top rounded-top-4"
                    style={{
                      height: "220px",
                      objectFit: "cover",
                      width: "100%",
                      transition: "transform 0.4s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </div>
                <div className="card-body d-flex flex-column p-4">
                  <h5 className="card-title fw-bold fs-4 text-dark">
                    {pkg.destination}
                  </h5>
                  <p className="card-text text-muted small flex-grow-1 mt-2">
                    {pkg.description.length > 100
                      ? pkg.description.substring(0, 100) + "..."
                      : pkg.description}
                  </p>
                  <Link
                    to={`/packages/${pkg._id}`}
                    className="mt-3 text-decoration-none"
                  >
                    <button className="btn btn-primary w-100 rounded-pill shadow-sm">
                      View Package →
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
