const Joi = require("joi");
const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema({
  departureTime: {
    type: String,
    required: true,
  },
  arivalTime: {
    type: String,
    required: true,
  },
  departureStation: {
    type: String,
    required: true,
  },
  arivalStation: {
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

const Trains = mongoose.model("trains", trainSchema);

const validateTrain = (text) => {
  const schema = {
    departureTime: Joi.string().required(),
    arivalTime: Joi.string().required(),
    departureStation: Joi.string().required(),
    arivalStation: Joi.string().required(),
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
  Trains: Trains,
  validateTrain: validateTrain,
};
