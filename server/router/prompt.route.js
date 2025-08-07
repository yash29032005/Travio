const express = require("express");
const { getReply } = require("../controller/prompt.controller");
const Router = express.Router();

Router.post("/", getReply);

module.exports = Router;
