const User = require("../models/User");
const { hashPassword, comparePassword } = require("../utils/hash");
const { generateToken } = require("../services/token.service");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User exists" });

  const hashed = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashed
  });

  const token = generateToken({
    id: user._id,
    role: user.role
  });

  res.status(201).json({ user, token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const match = await comparePassword(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  const token = generateToken({
    id: user._id,
    role: user.role
  });

  res.json({ user, token });
};