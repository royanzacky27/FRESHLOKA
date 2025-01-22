require("dotenv").config();
const express = require("express");
const Category = require("../models/category");
const { authenticateToken, checkAdmin } = require("../config/middlewares");

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const categories = await Category.find();

    return res.json({
      message: "Successfully retrieved category data!",
      data: categories,
    });
  } catch (error) {
    console.error("Error retrieving product data:", error);

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

router.post("/", authenticateToken, checkAdmin, async (req, res) => {
  try {
    const { name, description } = req.body;

    const createdBy = req.user._id;

    const newCategory = new Category({
      name,
      description,
      createdBy,
    });

    await newCategory.save();
    return res.status(201).json({
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
