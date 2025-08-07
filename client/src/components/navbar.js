import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Login from "../components/login";
import Register from "../components/register";
import { jwtDecode } from "jwt-decode";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

function Navbar({ links }) {
  const [loginShow, setLoginShow] = useState(false);
  const [registerShow, setRegisterShow] = useState(false);
  const [user, setUser] = useState(null);
  const [userid, setUserid] = useState(null);
  const { setAdmin } = useContext(UserContext);

  const openLogin = () => {
    setRegisterShow(false);
    setLoginShow(true);
  };

  const openRegister = () => {
    setLoginShow(false);
    setRegisterShow(true);
  };

  const onLoginSuccess = () => {
    setLoginShow(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decode = jwtDecode(token);
      setUser(decode.name);
      setUserid(decode.id);
    }
  }, []);

  function handlelogout() {
    localStorage.removeItem("token");
    setAdmin(false);
    setUser(null);
  }
  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{ background: "var(--primary-color)" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold fs-3" to="/">
            Travio
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {links.map((link, index) => (
                <li className="nav-item" key={index}>
                  {link.type === "link" ? (
                    <Link className="nav-link" to={link.path}>
                      {link.name}
                    </Link>
                  ) : (
                    <a className="nav-link" href={link.path}>
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
            {!user ? (
              <div className="d-flex align-items-center">
                <Button
                  variant="btn btn-primary"
                  onClick={() => setLoginShow(true)}
                >
                  Login / Register
                </Button>
              </div>
            ) : (
              <Dropdown data-bs-theme="primary">
                <Dropdown.Toggle
                  id="dropdown-button-primary-example1"
                  variant="primary"
                >
                  {user}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    as={Link}
                    to={`/history/${userid}`}
                    className="text-black text-decoration-none"
                  >
                    History
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#/action-4" onClick={handlelogout}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </div>
      </nav>
      <Login
        setUser={setUser}
        show={loginShow}
        onHide={() => setLoginShow(false)}
        openRegister={openRegister}
        onLoginSuccess={onLoginSuccess}
      />
      <Register
        show={registerShow}
        onHide={() => setRegisterShow(false)}
        openLogin={openLogin}
      />
    </>
  );
}
export default Navbar;
