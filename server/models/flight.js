const Joi = require("joi");
const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  departureTime: {
    type: String,
    required: true,
  },
  arivalTime: {
    type: String,
    required: true,
  },
  departureAirport: {
    type: String,
    required: true,
  },
  arivalAirport: {
    type: String,
    required: true,
  },
  departureTerminal: {
    type: String,
    required: true,
  },
  arivalTerminal: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
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

const Flights = mongoose.model("flights", flightSchema);

const validateFlight = (text) => {
  const schema = {
    departureTime: Joi.string().required(),
    arivalTime: Joi.string().required(),
    departureAirport: Joi.string().required(),
    arivalAirport: Joi.string().required(),
    departureTerminal: Joi.string().required(),
    arivalTerminal: Joi.string().required(),
    from: Joi.string().required(),
    to: Joi.string().required(),
    description: Joi.string().required(),
    rating: Joi.number().required().min(1).max(5),
    price: Joi.number().required(),
    image: Joi.string().required(),
  };
  return Joi.object(schema).validate(text);
};

module.exports = {
  Flights: Flights,
  validateFlight: validateFlight,
};
