// backend/routes/orders.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Membuat pesanan baru
router.post("/", async (req, res) => {
  // Logika untuk membuat pesanan
});

// Mendapatkan pesanan berdasarkan user ID
router.get("/:userId", async (req, res) => {
  // Logika untuk mendapatkan pesanan berdasarkan user ID
});

module.exports = router;
