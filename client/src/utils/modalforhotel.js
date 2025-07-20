import axios from "axios";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

function Modalforhotel({ show, onHide, handleSubmit }) {
  const [destination, setdestination] = useState("");
  const [location, setlocation] = useState("");
  const [room, setroom] = useState("");
  const [checkin, setcheckin] = useState("");
  const [checkout, setcheckout] = useState("");
  const [description, setdescription] = useState("");
  const [rating, setrating] = useState("");
  const [price, setprice] = useState("");
  const [image, setimage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/hotels`, {
        destination,
        location,
        room,
        checkin,
        checkout,
        description,
        rating,
        price,
        image,
      });

      toast.success("Hotel added successfully!");
      setdestination("");
      setlocation("");
      setroom("");
      setcheckin("");
      setcheckout("");
      setdescription("");
      setrating("");
      setprice("");
      setimage("");

      handleSubmit();
    } catch (err) {
      toast.error(err.response.data.error || "Something went wrong");
    }

    setdestination("");
    setlocation("");
    setroom("");
    setcheckin("");
    setcheckout("");
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
              <label htmlFor="destination">Destination</label>
              <input
                type="email"
                className="form-control"
                id="destination"
                placeholder="Destination"
                onChange={(e) => setdestination(e.target.value)}
              />
            </div>
            <div className="col">
              <label htmlFor="location">Location</label>
              <input
                type="email"
                className="form-control"
                id="location"
                placeholder="Location"
                onChange={(e) => setlocation(e.target.value)}
              />
            </div>
          </div>
          <br />
          <div className="form-group row">
            <div className="col">
              <label htmlFor="room">Room</label>
              <input
                type="email"
                className="form-control"
                id="room"
                placeholder="Room"
                onChange={(e) => setroom(e.target.value)}
              />
            </div>
            <div className="col">
              <label htmlFor="checkintime">Check-in Time</label>
              <input
                type="email"
                className="form-control"
                id="checkintime"
                placeholder='e.g. "12:30 PM"'
                onChange={(e) => {
                  setcheckin(e.target.value);
                }}
              />
            </div>
          </div>
          <br />
          <div className="form-group row">
            <div className="col">
              <label htmlFor="checkouttime">Check-out Time</label>
              <input
                type="email"
                className="form-control"
                id="checkouttime"
                placeholder='e.g. "12:30 PM"'
                onChange={(e) => {
                  setcheckout(e.target.value);
                }}
              />
            </div>
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
          </div>
          <br />
          <div className="form-group row">
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
          </div>
          <br />
          <div className="form-group row">
            <div className="col">
              <label htmlFor="image">Image</label>
              <input
                type="email"
                className="form-control"
                id="image"
                placeholder='e.g. "hotel1.webp" , "hotel2.webp" , "hotel3.webp"'
                onChange={(e) => setimage(e.target.value)}
              />
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" onClick={onHide}>
          Close
        </button>
        <button className="btn btn-success" onClick={onSubmit}>
          Save Hotel
        </button>
      </Modal.Footer>
    </Modal>
  );
}
export default Modalforhotel;
