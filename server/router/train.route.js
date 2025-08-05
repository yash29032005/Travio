const express = require("express");
const Router = express.Router();
const {
  getTrains,
  getTrainById,
  updateTrain,
  getTrainTicket,
  deleteTrain,
} = require("../controller/train.controller");

Router.get("/", getTrains);

Router.get("/:id", getTrainById);

Router.post("/", updateTrain);

Router.get("/ticket/:id", getTrainTicket);

Router.delete("/:id", deleteTrain);

module.exports = Router;
