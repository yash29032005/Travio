import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { jwtDecode } from "jwt-decode";
import UserContext from "../context/UserContext";

function Login({ setUser, show, onHide, openRegister, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAdmin } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, { email, password })
      .then((res) => {
        const token = res.headers["x-auth-token"];
        if (token) {
          localStorage.setItem("token", token);
          const decode = jwtDecode(token);
          setUser(decode.name);
          setAdmin(decode.admin);
        }
        toast.success(res.data.message);
        onLoginSuccess();
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
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
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control border border-dark-subtle"
                id="exampleInputEmail1"
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
            <div className="d-flex w-100 justify-content-center">
              <button type="submit" className="btn btn-dark w-100">
                Login
              </button>
            </div>
            <div className="d-flex p-0 pt-2">
              Don't have an account?&nbsp;
              <Link className="alert-link-primary" onClick={openRegister}>
                Sign up
              </Link>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Login;
