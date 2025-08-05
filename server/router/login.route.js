const express = require("express");
const Router = express.Router();
const { loginUser } = require("../controller/login.controller");

Router.post("/", loginUser);

module.exports = Router;
