require("dotenv").config();
const express = require("express");
const Category = require("../models/category");
const {
  authenticateToken,
  checkAdmin,
  checkTokenBlacklist,
} = require("../config/middlewares");

const router = express.Router();

router.get("/", authenticateToken, checkTokenBlacklist, async (req, res) => {
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

router.post(
  "/",
  authenticateToken,
  checkAdmin,
  checkTokenBlacklist,
  async (req, res) => {
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

      const category = await Category.findById(id);

      if (!category) {
        return res.status(404).json({
          message: "Category not found",
        });
      }

      Object.assign(category, updateData);
      await category.save();

      return res.json({
        message: "Category updated successfully",
        data: category,
      });
    } catch (error) {
      console.error("Error updating category:", error);
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }
);

module.exports = router;
