const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

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
    min: 6,
    max: 1024,
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
    password: Joi.string().min(6).max(1024).required(),
    admin: Joi.boolean().default(false),
  };
  return Joi.object(schema).validate(text);
}

function validateLogin(text) {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(1024).required(),
  };
  return Joi.object(schema).validate(text);
}

module.exports = {
  User: User,
  ValidateR: validateRegister,
  ValidateL: validateLogin,
};
