// backend/models/Product.js
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  stock: Number,
});

module.exports = mongoose.model("Product", ProductSchema);
