const express = require("express");
const Router = express.Router();

const register = require("./register.route");
const login = require("./login.route");
const flight = require("./flight.route");
const train = require("./train.route");
const hotel = require("./hotel.route");
const packages = require("./package.route");
const payment = require("./payment.route");
const history = require("./history.route");
const prompt = require("./prompt.route");

Router.use("/register", register);
Router.use("/login", login);
Router.use("/flights", flight);
Router.use("/trains", train);
Router.use("/hotels", hotel);
Router.use("/packages", packages);
Router.use("/payment", payment);
Router.use("/history", history);
Router.use("/prompt", prompt);

module.exports = Router;
