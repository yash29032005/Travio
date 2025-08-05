const express = require("express");
const Router = express.Router();
const { getHistory } = require("../controller/history.controller");

Router.get("/:id", getHistory);

module.exports = Router;
