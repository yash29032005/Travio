import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Section3() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/packages`)
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
    <div id="section3" style={{ width: "100vw" }} className="p-5">
      <div
        className="d-flex align-items-center justify-content-center fw-bold mb-3"
        style={{
          height: "20%",
          width: "100%",
          fontFamily: "serif",
          fontSize: "clamp(1rem,5vh,2rem)",
        }}
      >
        Top Destination
      </div>
      <div
        className="d-flex flex-column flex-sm-row align-items-center justify-content-around gap-5 pt-0"
        style={{ height: "80%", width: "100%" }}
      >
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          packages.slice(0, 3).map((pkg) => (
            <div
              className="rounded-4 p-4"
              key={pkg._id}
              style={{
                height: "100%",
                width: "100%",
                background: "var(--secondary-color)",
              }}
            >
              <img
                src={pkg.image}
                className="rounded-4 mb-2"
                style={{
                  height: "60%",
                  width: "100%",
                  objectFit: "cover",
                }}
                alt="packageimage"
              />
              <p className="fw-bold m-0">{pkg.destination}</p>
              <p>{pkg.description}</p>
              <Link to={`/packages/${pkg._id}`}>
                <button className="btn btn-outline-primary w-100">
                  View Packages
                </button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Section3;
