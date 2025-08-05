const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Router = express.Router();
const { Orders } = require("../model/order.model");

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

Router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount,
      currency: "INR",
      receipt: "receipt_order_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

Router.post("/verify", async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    image,
    type,
    userid,
    from,
    to,
    price,
  } = req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(sign.toString())
    .digest("hex");

  if (expectedSign === razorpay_signature) {
    res.json({ success: true, message: "Payment verified successfully" });

    const order = new Orders({
      orderid: razorpay_order_id,
      paymentid: razorpay_payment_id,
      image,
      type,
      userid,
      from,
      to,
      price,
    });
    await order.save();
  } else {
    res
      .status(400)
      .json({ success: false, message: "Payment verification failed" });
  }
});

module.exports = Router;
