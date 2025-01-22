const express = require("express");
const Cart = require("../models/cart");
const Product = require("../models/product");
const {
  authenticateToken,
  checkTokenBlacklist,
} = require("../config/middlewares");

const router = express.Router();

router.get("/", authenticateToken, checkTokenBlacklist, async (req, res) => {
  try {
    const userIsAdmin = req.user.isAdmin;
    const userId = req.user._id;
    const status = req.query.status;

    const cartItems = userIsAdmin
      ? status
        ? await Cart.find({ status })
        : await Cart.find()
      : await Cart.find({
          createdBy: userId,
          status: "CHECKOUT",
        });

    return res.json({
      message: "Successfully retrieved cart items!",
      data: cartItems,
    });
  } catch (error) {
    console.error("Error retrieving cart items:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

router.post("/", authenticateToken, checkTokenBlacklist, async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user._id;

    const cartItems = [];

    for (let item of items) {
      const product = await Product.findById(item.id);

      if (!product) {
        return res.status(404).json({
          message: `Product with ID ${item.id} not found`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Quantity for product ${product.name} cannot be greater than stock. Available stock: ${product.stock}`,
        });
      }

      cartItems.push({
        product: product,
        quantity: item.quantity,
      });
    }

    const newCart = new Cart({
      createdBy: userId,
      items: cartItems,
    });
    await newCart.save();

    for (let item of cartItems) {
      const product = await Product.findById(item.product._id);
      product.stock -= item.quantity;
      await product.save();
    }

    return res.status(201).json({
      message: "Products added to cart successfully",
      data: newCart,
    });
  } catch (error) {
    console.error("Error adding products to cart:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
