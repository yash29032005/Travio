import Navbar from "../components/navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const links = [{ name: "Home", path: "/", type: "Link" }];
  const { id } = useParams();
  const [order, setOrder] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/history/${id}`)
      .then((response) => {
        setOrder(response.data.orders);
      })
      .catch((error) => {
        console.error("Error fetching order history:", error);
      });
  }, [id]);

  return (
    <>
      <Navbar links={links} />
      <h1 className="text-center">Order History</h1>
      {order.map((o, index) => (
        <ul key={index}>
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
                src={`/${o.image}`}
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
                {o.from}
                <span style={{ fontSize: "30px" }}>&#8594;</span>
                {o.to}
              </p>
              <p
                className="fw-bold"
                style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}
              >
                &#x20B9;{o.price}
              </p>
            </div>
          </div>
        </ul>
      ))}
    </>
  );
}

export default Home;
