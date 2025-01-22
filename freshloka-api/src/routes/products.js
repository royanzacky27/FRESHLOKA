require("dotenv").config();
const express = require("express");
const Product = require("../models/product");
const {
  authenticateToken,
  checkAdmin,
  checkTokenBlacklist,
} = require("../config/middlewares");

const router = express.Router();

router.get("/", authenticateToken, checkTokenBlacklist, async (req, res) => {
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

router.post(
  "/",
  authenticateToken,
  checkAdmin,
  checkTokenBlacklist,
  async (req, res) => {
    try {
      const { ...data } = req.body;

      const createdBy = req.user._id;

      const newProduct = new Product({
        ...data,
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
  }
);

router.patch(
  "/:id",
  authenticateToken,
  checkAdmin,
  checkTokenBlacklist,
  async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      Object.assign(product, updateData);
      await product.save();

      return res.json({
        message: "Product updated successfully",
        data: product,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }
);

module.exports = router;
