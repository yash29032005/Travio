const express = require("express");
const Router = express.Router();
const { Trains, validateTrain } = require("../models/train");
const PDFDocument = require("pdfkit");

Router.get("/", async (req, res) => {
  const { from, to } = req.query;

  const train = await Trains.find({
    ...(from && { from: { $regex: `^${from}`, $options: "i" } }),
    ...(to && { to: { $regex: `^${to}`, $options: "i" } }),
  });
  res.json(train);
});

Router.get("/:id", async (req, res) => {
  const train = await Trains.findById(req.params.id);
  if (!train) return res.status(400).json({ error: "Bad request" });
  res.json(train);
});

Router.post("/", async (req, res) => {
  const { error } = validateTrain(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const train = new Trains({
    departureTime: req.body.departureTime,
    arivalTime: req.body.arivalTime,
    departureStation: req.body.departureStation,
    arivalStation: req.body.arivalStation,
    from: req.body.from,
    to: req.body.to,
    description: req.body.description,
    rating: req.body.rating,
    price: req.body.price,
    image: req.body.image,
  });
  const result = await train.save();
  res.status(200).send(result);
});

Router.get("/ticket/:id", async (req, res) => {
  const { orderid } = req.query;
  const { paymentid } = req.query;
  const train = await Trains.findById(req.params.id);
  if (!train) return res.status(400).json({ error: "Bad request" });
  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="Trainticket.pdf"'
  );
  doc.pipe(res);

  doc.fontSize(20).text("train Ticket", { align: "center" });
  doc.moveDown();
  doc.text(`User ID: ${req.params.id}`);
  doc.text(`Order ID: ${orderid}`);
  doc.text(`Payment ID: ${paymentid}`);
  doc.text(`From: ${train.from}`);
  doc.text(`To: ${train.to}`);
  doc.text(`Departure Time: ${train.departureTime}`);
  doc.text(`Arrival Time: ${train.arivalTime}`);
  doc.text(`Departure Station: ${train.departureStation}`);
  doc.text(`Arrival Station: ${train.arivalStation}`);
  doc.text(`Description: ${train.description}`);
  doc.text(`Rating: ${train.rating}`);
  doc.text(`Price: ${train.price}/-`);

  doc.end();
});

Router.delete("/:id", async (req, res) => {
  try {
    const train = await Trains.findByIdAndDelete(req.params.id);
    if (!train) return res.status(404).json({ error: "Train not found" });
    res.status(200).json({ message: "Train deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = Router;
