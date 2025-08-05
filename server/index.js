require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const connectDB = require("./startup/db");
const allRoute = require("./router/allRoute");

connectDB();

app.use(
  cors({
    origin: process.env.REACT_APP_WEB_URI,
    credentials: true,
    exposedHeaders: ["x-auth-token"],
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api", allRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening to ${port}`);
});
