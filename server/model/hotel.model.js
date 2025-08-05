const Joi = require("joi");
const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  checkin: {
    type: String,
    required: true,
  },
  checkout: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Hotels = mongoose.model("hotels", hotelSchema);

const validateHotel = (text) => {
  const schema = {
    destination: Joi.string().required(),
    location: Joi.string().required(),
    room: Joi.string().required(),
    checkin: Joi.string().required(),
    checkout: Joi.string().required(),
    description: Joi.string().required(),
    rating: Joi.number().required().min(1).max(5),
    price: Joi.number().required(),
    image: Joi.string().required(),
  };
  return Joi.object(schema).validate(text);
};

module.exports = {
  Hotels: Hotels,
  validateHotel: validateHotel,
};
