import "./App.css";
import Home from "./pages/homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ShowFlight from "./pages/flightpage";
import ShowTrain from "./pages/trainpage";
import ShowHotel from "./pages/hotelpage";
import ShowPackage from "./pages/packagepage";
import FlightThirdpage from "./pages/flightthirdpage";
import TrainThirdpage from "./pages/trainthirdpage";
import HotelThirdpage from "./pages/hotelthirdpage";
import PackageThirdpage from "./pages/packagethirdpage";
import Checkout from "./pages/checkout";
import History from "./pages/history";
import { useState } from "react";
import UserContext from "./context/UserContext";
import { jwtDecode } from "jwt-decode";

function App() {
  let decodedToken = {};
  try {
    const token = localStorage.getItem("token");
    if (token) {
      decodedToken = jwtDecode(token);
    }
  } catch (error) {
    console.error("Invalid token", error);
  }

  const [admin, setAdmin] = useState(decodedToken.admin || false);
  return (
    <>
      <UserContext.Provider value={{ admin, setAdmin }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flights" element={<ShowFlight />}></Route>
            <Route path="/trains" element={<ShowTrain />}></Route>
            <Route path="/hotels" element={<ShowHotel />}></Route>
            <Route path="/packages" element={<ShowPackage />}></Route>
            <Route path="/flights/:id" element={<FlightThirdpage />}></Route>
            <Route path="/trains/:id" element={<TrainThirdpage />}></Route>
            <Route path="/hotels/:id" element={<HotelThirdpage />}></Route>
            <Route path="/packages/:id" element={<PackageThirdpage />}></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
            <Route path="/history/:id" element={<History />}></Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
      <ToastContainer />
    </>
  );
}

export default App;
