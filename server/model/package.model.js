const Joi = require("joi");
const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
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
  itinerary: [
    {
      day: String,
      title: String,
      points: [String],
    },
  ],
});

const Packages = mongoose.model("packages", packageSchema);

const validatePackage = (text) => {
  const schema = {
    destination: Joi.string().required(),
    description: Joi.string().required(),
    duration: Joi.string().required(),
    rating: Joi.number().required().min(1).max(5),
    price: Joi.number().required(),
    image: Joi.string().required(),
    itinerary: Joi.array()
      .items(
        Joi.object({
          day: Joi.string().required(),
          title: Joi.string().required(),
          points: Joi.array().items(Joi.string()).required(),
        })
      )
      .required(),
  };
  return Joi.object(schema).validate(text);
};

module.exports = {
  Packages: Packages,
  validatePackage: validatePackage,
};
