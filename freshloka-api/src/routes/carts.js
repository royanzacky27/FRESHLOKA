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
        ? await Cart.find({ status }).lean()
        : await Cart.find().lean()
      : await Cart.find({
          createdBy: userId,
          status: "CHECKOUT",
        }).lean();

    // Ambil semua ID produk dari cartItems
    const productIds = cartItems.flatMap((item) =>
      item.items.map((product) => product.product)
    );

    // Menghapus duplikat ID produk
    const uniqueProductIds = [...new Set(productIds)];

    // Ambil data produk dari database
    const products = await Product.find({
      _id: { $in: uniqueProductIds },
    }).lean();

    // Gabungkan data produk ke dalam items
    const cartWithProductDetails = cartItems.map((cartItem) => ({
      _id: cartItem._id,
      status: cartItem.status,
      createdAt: cartItem.createdAt,
      updatedAt: cartItem.updatedAt,
      items: cartItem.items.map((item) => {
        const productDetail = products.find((product) =>
          product._id.equals(item.product)
        );
        return {
          ...item,
          product: productDetail,
        };
      }),
    }));

    return res.json({
      message: "Successfully retrieved product details from cart items!",
      data: cartWithProductDetails,
    });
    // return res.json({
    //   message: "Successfully retrieved cart items!",
    //   data: cartItems,
    // });
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

    let cart = await Cart.findOne({ createdBy: userId });
    if (!cart) {
      cart = new Cart({ createdBy: userId, items: [] });
    }

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

      // Cek apakah produk sudah ada dalam cart
      const existingItem = cart.items.find(
        (cartItem) => cartItem.product.toString() === product._id.toString()
      );

      if (existingItem) {
        // Jika produk sudah ada, tambahkan kuantitas
        existingItem.quantity += item.quantity;
      } else {
        // Jika produk belum ada, tambahkan produk baru ke cart
        cart.items.push({
          product: product._id,
          quantity: item.quantity,
        });
      }

      // Update stok produk
      product.stock -= item.quantity;
      await product.save();
    }

    // Simpan cart
    await cart.save();

    // Populate detail product untuk response
    const populatedCart = await Cart.findById(cart._id).populate(
      "items.product"
    );

    return res.status(201).json({
      message: "Products added to cart successfully",
      data: populatedCart,
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
