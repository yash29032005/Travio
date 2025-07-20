const express = require("express");
const Router = express.Router();
const { Packages, validatePackage } = require("../models/package");
const PDFDocument = require("pdfkit");

Router.get("/", async (req, res) => {
  const { destination } = req.query;

  const package = await Packages.find({
    ...(destination && {
      destination: { $regex: `^${destination}`, $options: "i" },
    }),
  });
  res.json(package);
});

Router.get("/:id", async (req, res) => {
  const package = await Packages.findById(req.params.id);
  if (!package) return res.status(400).json({ error: "Bad request" });
  res.json(package);
});

Router.post("/", async (req, res) => {
  const { error } = validatePackage(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const package = new Packages({
    destination: req.body.destination,
    description: req.body.description,
    duration: req.body.duration,
    rating: req.body.rating,
    price: req.body.price,
    image: req.body.image,
    itinerary: req.body.itinerary,
  });
  const result = await package.save();
  res.status(200).send(result);
});

Router.get("/ticket/:id", async (req, res) => {
  const { orderid, paymentid } = req.query;

  const pkg = await Packages.findById(req.params.id);
  if (!pkg) return res.status(400).json({ error: "Bad request" });

  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="Packageticket.pdf"'
  );
  doc.pipe(res);

  // Header
  doc.fontSize(20).text("Package Ticket", { align: "center" });
  doc.moveDown();

  // Package Info
  doc.text(`User ID: ${req.params.id}`);
  doc.text(`Order ID: ${orderid}`);
  doc.text(`Payment ID: ${paymentid}`);
  doc.text(`Destination: ${pkg.destination}`);
  doc.text(`Description: ${pkg.description}`);
  doc.text(`Duration: ${pkg.duration}`);
  doc.text(`Rating: ${pkg.rating}`);
  doc.text(`Price: ₹${String(pkg.price).trim()}/-`);
  doc.moveDown();

  // Itinerary
  if (pkg.itinerary && pkg.itinerary.length > 0) {
    doc.fontSize(14).text("Itinerary", { underline: true });
    doc.moveDown(0.5);

    pkg.itinerary.forEach((item, idx) => {
      doc.fontSize(12).text(`Day ${item.day}: ${item.title}`);
      if (Array.isArray(item.points)) {
        item.points.forEach((point) => {
          doc.text(`  • ${point}`);
        });
      }
      doc.moveDown();
    });
  }

  doc.end();
});

Router.delete("/:id", async (req, res) => {
  try {
    const package = await Packages.findByIdAndDelete(req.params.id);
    if (!package) return res.status(404).json({ error: "Package not found" });
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = Router;
