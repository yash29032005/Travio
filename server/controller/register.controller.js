const { User, ValidateR } = require("../model/user.model");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  const { error } = ValidateR(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json({ error: "User already registered" });

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  res.status(200).json({ message: "User is registered" });
};
