import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

function Register({ show, onHide, openLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/register`,
        {
          name,
          email,
          password,
        }
      );
      toast.success(res.data.message);
      openLogin();
    } catch (err) {
      toast.error(err.response.data.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header
          closeButton
          className="p-3 border-bottom-0"
        ></Modal.Header>
        <Modal.Body className="p-0">
          <form className="border-0 p-4 pt-0 m-0" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control border border-dark-subtle"
                id="exampleInputName"
                autoFocus="true"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                id="exampleInputEmail1"
                className="form-control border border-dark-subtle"
                aria-describedby="emailHelp"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control border border-dark-subtle"
                id="exampleInputPassword1"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input border border-dark-subtle"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Agree the terms and conditions
              </label>
            </div>
            <button type="submit" className="btn btn-dark w-100">
              Register
            </button>
            <div className="d-flex pb-0 pt-2">
              Already have an account?&nbsp;
              <Link className="alert-link-primary" onClick={openLogin}>
                Login
              </Link>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Register;
