const express = require("express");
const Router = express.Router();
const {
  getHotels,
  getHotelById,
  updateHotel,
  getHotelTicket,
  deleteHotel,
} = require("../controller/hotel.controller");

Router.get("/", getHotels);

Router.get("/:id", getHotelById);

Router.post("/", updateHotel);

Router.get("/ticket/:id", getHotelTicket);

Router.delete("/:id", deleteHotel);

module.exports = Router;
