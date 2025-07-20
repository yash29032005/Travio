const express = require("express");
const Router = express.Router();
const { Flights, validateFlight } = require("../models/flight");
const PDFDocument = require("pdfkit");

Router.get("/", async (req, res) => {
  const { from, to } = req.query;

  const flight = await Flights.find({
    ...(from && { from: { $regex: `^${from}`, $options: "i" } }),
    ...(to && { to: { $regex: `^${to}`, $options: "i" } }),
  });
  res.json(flight);
});

Router.get("/:id", async (req, res) => {
  const flight = await Flights.findById(req.params.id);
  if (!flight) return res.status(400).json({ error: "Bad request" });
  res.json(flight);
});

Router.post("/", async (req, res) => {
  const { error } = validateFlight(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const flight = new Flights({
    departureTime: req.body.departureTime,
    arivalTime: req.body.arivalTime,
    departureAirport: req.body.departureAirport,
    arivalAirport: req.body.arivalAirport,
    departureTerminal: req.body.departureTerminal,
    arivalTerminal: req.body.arivalTerminal,
    from: req.body.from,
    to: req.body.to,
    description: req.body.description,
    rating: req.body.rating,
    price: req.body.price,
    image: req.body.image,
  });
  const result = await flight.save();
  res.status(200).send(result);
});

Router.get("/ticket/:id", async (req, res) => {
  const { orderid } = req.query;
  const { paymentid } = req.query;
  const flight = await Flights.findById(req.params.id);
  if (!flight) return res.status(400).json({ error: "Bad request" });
  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="Flightticket.pdf"'
  );
  doc.pipe(res);

  doc.fontSize(20).text("Flight Ticket", { align: "center" });
  doc.moveDown();
  doc.text(`User ID: ${req.params.id}`);
  doc.text(`Order ID: ${orderid}`);
  doc.text(`Payment ID: ${paymentid}`);
  doc.text(`From: ${flight.from}`);
  doc.text(`To: ${flight.to}`);
  doc.text(`Departure Time: ${flight.departureTime}`);
  doc.text(`Arrival Time: ${flight.arivalTime}`);
  doc.text(`Departure Airport: ${flight.departureAirport}`);
  doc.text(`Arrival Airport: ${flight.arivalAirport}`);
  doc.text(`Departure Terminal: ${flight.departureTerminal}`);
  doc.text(`Arrival Terminal: ${flight.arivalTerminal}`);
  doc.text(`Description: ${flight.description}`);
  doc.text(`Rating: ${flight.rating}`);
  doc.text(`Price: ${flight.price}/-`);

  doc.end();
});

Router.delete("/:id", async (req, res) => {
  try {
    const flight = await Flights.findByIdAndDelete(req.params.id);
    if (!flight) return res.status(404).json({ error: "Flight not found" });
    res.status(200).json({ message: "Flight deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = Router;
