const Product = require("../models/Product");

exports.addProduct = async (
  req,
  res
) => {
  try {
    const { name, price, info } = req.body;

    if (!name || price == null) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    // If a file was uploaded via multer, use its path
    let imagePath = "";
    if (req.file) {
      imagePath = "/uploads/" + req.file.filename;
    } else if (req.body.image) {
      imagePath = req.body.image;
    }

    const product = await Product.create({
      name,
      price,
      info: info || "",
      image: imagePath
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getProducts = async (
  req,
  res
) => {
  try {
    const products = await Product.find({}, "name price info image");

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.deleteProduct = async (
  req,
  res
) => {
  try {
    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Product Deleted Successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};