import axios from "axios";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

function Modalforpackage({ show, onHide, handleSubmit }) {
  const [destination, setDestination] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [rating, setRating] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const [day, setDay] = useState("");
  const [title, setTitle] = useState("");
  const [points, setPoints] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/packages`, {
        destination,
        description,
        duration,
        rating: Number(rating),
        price: Number(price),
        image,
        itinerary: [
          {
            day,
            title,
            points: points.split(",").map((point) => point.trim()),
          },
        ],
      });

      toast.success("Package added successfully!");
      setDestination("");
      setDescription("");
      setDuration("");
      setRating("");
      setPrice("");
      setImage("");
      setDay("");
      setTitle("");
      setPoints("");

      handleSubmit();
    } catch (err) {
      toast.error(err?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Body>
        <h4>Add a New Travel Package</h4>
        <form className="container">
          <div className="form-group row">
            <div className="col">
              <label>Destination</label>
              <input
                type="text"
                className="form-control"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Destination"
              />
            </div>
            <div className="col">
              <label>Duration</label>
              <input
                type="text"
                className="form-control"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 5"
              />
            </div>
          </div>
          <br />
          <div className="form-group row">
            <div className="col">
              <label>Description</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the package"
              />
            </div>
            <div className="col">
              <label>Image URL</label>
              <input
                type="text"
                className="form-control"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="e.g. package1.webp , package2.webp , package3.webp"
              />
            </div>
          </div>
          <br />
          <div className="form-group row">
            <div className="col">
              <label>Rating</label>
              <input
                type="text"
                className="form-control"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="e.g. 4"
                step="0.1"
              />
            </div>
            <div className="col">
              <label>Price</label>
              <input
                type="text"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
              />
            </div>
          </div>
          <hr />
          <h5>Itinerary - Day 1</h5>
          <div className="form-group row">
            <div className="col">
              <label>Day</label>
              <input
                type="text"
                className="form-control"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="e.g. Day 1"
              />
            </div>
            <div className="col">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Arrival & Check-in"
              />
            </div>
          </div>
          <br />
          <div className="form-group">
            <label>Points (comma-separated)</label>
            <textarea
              className="form-control"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              placeholder="e.g. Welcome drink, hotel check-in, dinner"
            />
          </div>
          <hr />
          <h5>Itinerary - Day 2</h5>
          <div className="form-group row">
            <div className="col">
              <label>Day</label>
              <input
                type="text"
                className="form-control"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="e.g. Day 1"
              />
            </div>
            <div className="col">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Arrival & Check-in"
              />
            </div>
          </div>
          <br />
          <div className="form-group">
            <label>Points (comma-separated)</label>
            <textarea
              className="form-control"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              placeholder="e.g. Welcome drink, hotel check-in, dinner"
            />
          </div>
          <hr />
          <h5>Itinerary - Day 3</h5>
          <div className="form-group row">
            <div className="col">
              <label>Day</label>
              <input
                type="text"
                className="form-control"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="e.g. Day 1"
              />
            </div>
            <div className="col">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Arrival & Check-in"
              />
            </div>
          </div>
          <br />
          <div className="form-group">
            <label>Points (comma-separated)</label>
            <textarea
              className="form-control"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              placeholder="e.g. Welcome drink, hotel check-in, dinner"
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onHide}>
          Close
        </button>
        <button className="btn btn-success" onClick={onSubmit}>
          Save Package
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default Modalforpackage;
