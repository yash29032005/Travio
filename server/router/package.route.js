const express = require("express");
const Router = express.Router();
const {
  getPackages,
  getPackageById,
  updatePackage,
  getPackageTicket,
  deletePackage,
} = require("../controller/package.controller");

Router.get("/", getPackages);

Router.get("/:id", getPackageById);

Router.post("/", updatePackage);

Router.get("/ticket/:id", getPackageTicket);

Router.delete("/:id", deletePackage);

module.exports = Router;
