import axios from "axios";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

function Modalfortrain({ show, onHide, handleSubmit }) {
  const [departureTime, setdepartureTime] = useState("");
  const [arivalTime, setarivalTime] = useState("");
  const [departureStation, setdepartureStation] = useState("");
  const [arivalStation, setarivalStation] = useState("");
  const [from, setfrom] = useState("");
  const [to, setto] = useState("");
  const [description, setdescription] = useState("");
  const [rating, setrating] = useState("");
  const [price, setprice] = useState("");
  const [image, setimage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/trains`, {
        departureTime,
        arivalTime,
        departureStation,
        arivalStation,
        from,
        to,
        description,
        rating,
        price,
        image,
      });

      toast.success("Train added successfully!");
      setdepartureTime("");
      setarivalTime("");
      setdepartureStation("");
      setarivalStation("");
      setfrom("");
      setto("");
      setdescription("");
      setrating("");
      setprice("");
      setimage("");

      handleSubmit();
    } catch (err) {
      toast.error(err.response.data.error || "Something went wrong");
    }

    setdepartureTime("");
    setarivalTime("");
    setdepartureStation("");
    setarivalStation("");
    setfrom("");
    setto("");
    setdescription("");
    setrating("");
    setprice("");
    setimage("");
  };
  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Body>
        <h4>Enter the details you want to insert</h4>
        <form className="container">
          <div className="form-group row">
            <div className="col">
              <label htmlFor="departureTime">Departure Time</label>
              <input
                type="email"
                className="form-control"
                id="departureTime"
                placeholder='e.g. "12:30 PM"'
                onChange={(e) => {
                  setdepartureTime(e.target.value);
                }}
              />
            </div>
            <div className="col">
              <label htmlFor="arivalTime">Arrival Time</label>
              <input
                type="email"
                className="form-control"
                id="arivalTime"
                placeholder='e.g. "4:00 PM"'
                onChange={(e) => setarivalTime(e.target.value)}
              />
            </div>
          </div>
          <br />
          <div className="form-group row">
            <div className="col">
              <label htmlFor="departureStation">Departure Station</label>
              <input
                type="email"
                className="form-control"
                id="departureStation"
                placeholder="Departure Station"
                onChange={(e) => setdepartureStation(e.target.value)}
              />
            </div>
            <div className="col">
              <label htmlFor="arivalStation">Arrival Station</label>
              <input
                type="email"
                className="form-control"
                id="arivalStation"
                placeholder="Arrival Station"
                onChange={(e) => setarivalStation(e.target.value)}
              />
            </div>
          </div>
          <br />
          <div className="form-group row">
            <div className="col">
              <label htmlFor="from">From</label>
              <input
                type="email"
                className="form-control"
                id="from"
                placeholder="From"
                onChange={(e) => setfrom(e.target.value)}
              />
            </div>
            <div className="col">
              <label htmlFor="to">To</label>
              <input
                type="email"
                className="form-control"
                id="to"
                placeholder="To"
                onChange={(e) => setto(e.target.value)}
              />
            </div>
          </div>
          <br />
          <div className="form-group row">
            <div className="col">
              <label htmlFor="description">Description</label>
              <input
                type="email"
                className="form-control"
                id="description"
                placeholder="Description"
                onChange={(e) => setdescription(e.target.value)}
              />
            </div>
            <div className="col">
              <label htmlFor="rating">Rating</label>
              <input
                type="email"
                className="form-control"
                id="rating"
                placeholder='e.g. "1-5"'
                onChange={(e) => setrating(e.target.value)}
              />
            </div>
          </div>
          <br />
          <div className="form-group row">
            <div className="col">
              <label htmlFor="price">Price</label>
              <input
                type="email"
                className="form-control"
                id="price"
                placeholder="Price"
                onChange={(e) => setprice(e.target.value)}
              />
            </div>
            <div className="col">
              <label htmlFor="image">Image</label>
              <input
                type="email"
                className="form-control"
                id="image"
                placeholder='e.g. "train1.webp" , "train2.webp" , "train3.webp"'
                onChange={(e) => setimage(e.target.value)}
              />
            </div>
          </div>
          <br />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" onClick={onHide}>
          Close
        </button>
        <button className="btn btn-success" onClick={onSubmit}>
          Save Train
        </button>
      </Modal.Footer>
    </Modal>
  );
}
export default Modalfortrain;
