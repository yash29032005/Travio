require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const connectDB = require("./startup/db");

const register = require("./router/register");
const login = require("./router/login");
const flight = require("./router/flights");
const train = require("./router/trains");
const hotel = require("./router/hotels");
const packages = require("./router/packages");
const payment = require("./router/payment");
const history = require("./router/history");
connectDB();

app.use(
  cors({
    origin: process.env.REACT_APP_WEB_URI,
    exposedHeaders: ["x-auth-token"],
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/register", register);
app.use("/login", login);
app.use("/flights", flight);
app.use("/trains", train);
app.use("/hotels", hotel);
app.use("/packages", packages);
app.use("/payment", payment);
app.use("/history", history);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening to ${port}`);
});
