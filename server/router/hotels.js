const express = require("express");
const Router = express.Router();
const { Hotels, validateHotel } = require("../models/hotel");
const PDFDocument = require("pdfkit");

Router.get("/", async (req, res) => {
  const { destination } = req.query;

  const hotel = await Hotels.find({
    ...(destination && {
      destination: { $regex: `^${destination}`, $options: "i" },
    }),
  });
  res.json(hotel);
});

Router.get("/:id", async (req, res) => {
  const hotel = await Hotels.findById(req.params.id);
  if (!hotel) return res.status(400).json({ error: "Bad request" });
  res.json(hotel);
});

Router.post("/", async (req, res) => {
  const { error } = validateHotel(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const hotel = new Hotels({
    destination: req.body.destination,
    location: req.body.location,
    room: req.body.room,
    checkin: req.body.checkin,
    checkout: req.body.checkout,
    description: req.body.description,
    rating: req.body.rating,
    price: req.body.price,
    image: req.body.image,
  });
  const result = await hotel.save();
  res.status(200).send(result);
});

Router.get("/ticket/:id", async (req, res) => {
  const { orderid } = req.query;
  const { paymentid } = req.query;
  const hotel = await Hotels.findById(req.params.id);
  if (!hotel) return res.status(400).json({ error: "Bad request" });
  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="Hotelticket.pdf"'
  );
  doc.pipe(res);

  doc.fontSize(20).text("Hotel Ticket", { align: "center" });
  doc.moveDown();
  doc.text(`User ID: ${req.params.id}`);
  doc.text(`Order ID: ${orderid}`);
  doc.text(`Payment ID: ${paymentid}`);
  doc.text(`Destination: ${hotel.destination}`);
  doc.text(`Location: ${hotel.location}`);
  doc.text(`Room: ${hotel.room}`);
  doc.text(`Check-in: ${hotel.checkin}`);
  doc.text(`Check-out: ${hotel.checkout}`);
  doc.text(`Description: ${hotel.description}`);
  doc.text(`Rating: ${hotel.rating}`);
  doc.text(`Price: ${hotel.price}/-`);

  doc.end();
});

Router.delete("/:id", async (req, res) => {
  try {
    const hotel = await Hotels.findByIdAndDelete(req.params.id);
    if (!hotel) return res.status(404).json({ error: "Hotel not found" });
    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = Router;
