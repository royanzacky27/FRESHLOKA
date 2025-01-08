// backend/routes/products.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Mendapatkan semua produk
router.get("/", async (req, res) => {
  // Logika untuk mendapatkan produk
});

// Mendapatkan produk berdasarkan ID
router.get("/:id", async (req, res) => {
  // Logika untuk mendapatkan produk berdasarkan ID
});

module.exports = router;
