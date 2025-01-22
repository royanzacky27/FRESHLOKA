require("dotenv").config();
const express = require("express");
const Product = require("../models/product");
const { authenticateToken, checkAdmin } = require("../config/middlewares");

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const category = req.query.category;

    const products = category
      ? await Product.find({ category })
      : await Product.find();

    return res.json({
      message: "Successfully retrieved product data!",
      data: products,
    });
  } catch (error) {
    console.error("Error retrieving product data:", error);

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { name, description, price, category, imageUrl } = req.body;

    const createdBy = req.user._id;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      imageUrl,
      createdBy,
    });

    await newProduct.save();
    return res.status(201).json({
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
