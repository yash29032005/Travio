const express = require("express");
const Router = express.Router();
const { User, ValidateL } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

Router.post("/", async (req, res) => {
  const { error } = ValidateL(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ error: "User is not registered" });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({ error: "Invalid password" });

  const token = jwt.sign(
    { name: user.name, id: user.id, admin: user.admin },
    process.env.JWT_PRIVATE_KEY
  );
  res
    .status(200)
    .header("x-auth-token", token)
    .json({ message: "Login successful" });
});

module.exports = Router;
