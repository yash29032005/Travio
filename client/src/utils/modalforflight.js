import axios from "axios";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

function Modalforflight({ show, onHide, handleSubmit }) {
  const [departureTime, setdepartureTime] = useState("");
  const [arivalTime, setarivalTime] = useState("");
  const [departureAirport, setdepartureAirport] = useState("");
  const [arivalAirport, setarivalAirport] = useState("");
  const [departureTerminal, setdepartureTerminal] = useState("");
  const [arivalTerminal, setarivalTerminal] = useState("");
  const [from, setfrom] = useState("");
  const [to, setto] = useState("");
  const [description, setdescription] = useState("");
  const [rating, setrating] = useState("");
  const [price, setprice] = useState("");
  const [image, setimage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/flights`, {
        departureTime,
        arivalTime,
        departureAirport,
        arivalAirport,
        departureTerminal,
        arivalTerminal,
        from,
        to,
        description,
        rating,
        price,
        image,
      });

      toast.success("Flight added successfully!");
      setdepartureTime("");
      setarivalTime("");
      setdepartureAirport("");
      setarivalAirport("");
      setdepartureTerminal("");
      setarivalTerminal("");
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
    setdepartureAirport("");
    setarivalAirport("");
    setdepartureTerminal("");
    setarivalTerminal("");
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
              <label htmlFor="departureAirport">Departure Airport</label>
              <input
                type="email"
                className="form-control"
                id="departureAirport"
                placeholder="Departure Airport"
                onChange={(e) => setdepartureAirport(e.target.value)}
              />
            </div>
            <div className="col">
              <label htmlFor="arivalAirport">Arrival Airport</label>
              <input
                type="email"
                className="form-control"
                id="arivalAirport"
                placeholder="Arrival Airport"
                onChange={(e) => setarivalAirport(e.target.value)}
              />
            </div>
          </div>
          <br />
          <div className="form-group row">
            <div className="col">
              <label htmlFor="departureTerminal">Departure Terminal</label>
              <input
                type="email"
                className="form-control"
                id="departureTerminal"
                placeholder='e.g. "T2"'
                onChange={(e) => setdepartureTerminal(e.target.value)}
              />
            </div>
            <div className="col">
              <label htmlFor="arivalTerminal">Arrival Terminal</label>
              <input
                type="email"
                className="form-control"
                id="arivalTerminal"
                placeholder='e.g. "T3"'
                onChange={(e) => setarivalTerminal(e.target.value)}
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
                placeholder='e.g. "flight1.webp" , "flight2.webp" , "flight3.webp"'
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
          Save Flight
        </button>
      </Modal.Footer>
    </Modal>
  );
}
export default Modalforflight;
