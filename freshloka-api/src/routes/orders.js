const express = require("express");
const Order = require("../models/order");
const Cart = require("../models/cart");
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

    const orders = userIsAdmin
      ? status
        ? await Order.find({ status })
        : await Order.find()
      : status
      ? await Order.find({ status, createdBy: userId })
      : await Order.find({ createdBy: userId });

    return res.json({
      message: "Successfully retrieved order items!",
      data: orders,
    });
  } catch (error) {
    console.error("Error retrieving order items:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

router.post(
  "/checkout",
  authenticateToken,
  checkTokenBlacklist,
  async (req, res) => {
    try {
      const { cartId, deliveryTime } = req.body;
      const userId = req.user._id;

      const cart = await Cart.findById(cartId);

      if (!cart) {
        return res.status(404).json({
          message: "Cart not found",
        });
      }

      // Membuat order baru berdasarkan cart yang ada
      const newOrder = new Order({
        cart: cartId,
        deliveryTime: deliveryTime,
        createdBy: userId,
      });

      // Simpan order
      cart.status = "PROGRESS";
      await cart.save();
      await newOrder.save();

      return res.status(201).json({
        message: "Order created successfully",
        data: newOrder,
      });
    } catch (error) {
      if (error.code === 11000) {
        // Duplicate key error
        return res.status(400).json({
          message: "An order already exists for this cart and user.",
        });
      }
      console.error("Error creating order:", error);
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }
);

router.patch(
  "/payment/:id",
  authenticateToken,
  checkTokenBlacklist,
  async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const order = await Order.findById(id);

      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }

      Object.assign(order, updateData);
      await order.save();

      const cartId = order.cart._id.toString();
      const cart = await Cart.findById(cartId);
      cart.status = "COMPLETED";
      await cart.save();

      return res.json({
        message: "Successfully payment the order!",
        data: order,
      });
    } catch (error) {
      console.error("Error pay the order:", error);
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }
);

module.exports = router;
