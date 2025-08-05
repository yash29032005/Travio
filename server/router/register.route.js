const express = require("express");
const Router = express.Router();
const { registerUser } = require("../controller/register.controller");

Router.post("/", registerUser);

module.exports = Router;
