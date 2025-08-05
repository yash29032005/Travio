const express = require("express");
const Router = express.Router();
const {
  updateFlight,
  getFlightTicket,
  deleteFlight,
  getFlights,
  getFlightById,
} = require("../controller/flight.controller");

Router.get("/", getFlights);

Router.get("/:id", getFlightById);

Router.post("/", updateFlight);

Router.get("/ticket/:id", getFlightTicket);

Router.delete("/:id", deleteFlight);

module.exports = Router;
