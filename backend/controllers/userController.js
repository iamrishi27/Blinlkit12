const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role
    } = req.body;

    const existingUser = await User.findOne({
      email
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({
      message: "User Registered Successfully",
      user
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    const user = await User.findOne({
      email
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
      return res.status(400).json({
        message: "Invalid Password"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn:
          process.env.JWT_EXPIRES_IN
      }
    );

    res.json({
      token,
      role: user.role,
      userId: user._id,
      name: user.name
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.addUserProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.products.includes(productId)) {
      user.products.push(productId);
      await user.save();
    }

    res.json({ message: "Product added to user" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyProducts = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate(
      "products",
      "name price info image"
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllUsersProducts = async (req, res) => {
  try {
    const users = await User.find({}, "name email role products").populate(
      "products",
      "name price info image"
    );

    const result = users.map((u) => ({
      id: u._id,
      name: u.name,
      email: u.email,
      role: u.role,
      products: u.products,
      count: u.products.length
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};