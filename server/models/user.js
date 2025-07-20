const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const complexityOptions = {
  min: 6,
  max: 10,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

const User = new mongoose.model("user", userSchema);

function validateRegister(text) {
  const schema = {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: passwordComplexity(complexityOptions),
    admin: Joi.boolean().default(false),
  };
  return Joi.object(schema).validate(text);
}

function validateLogin(text) {
  const schema = {
    email: Joi.string().email().required(),
    password: passwordComplexity(complexityOptions),
  };
  return Joi.object(schema).validate(text);
}

module.exports = {
  User: User,
  ValidateR: validateRegister,
  ValidateL: validateLogin,
};
