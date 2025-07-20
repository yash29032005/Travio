const express = require("express");
const Router = express.Router();
const { Orders } = require("../models/order");

Router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const orders = await Orders.find({ userid: id });

    if (orders.length === 0) {
      return res.status(404).json({ error: "There are no orders" });
    }

    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = Router;
