const mongoose = require("mongoose");
const Joi = require("joi");

const orderSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  orderid: {
    type: String,
    required: true,
  },
  paymentid: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
  },
  price: {
    type: String,
    required: true,
  },
});

const Orders = mongoose.model("order", orderSchema);

module.exports = {
  Orders: Orders,
};
