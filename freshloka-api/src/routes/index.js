const express = require("express");
const authRoutes = require("./auth");
const userRoutes = require("./users");
const categoryRoutes = require("./categories");
const cartRoutes = require("./carts");
const productRoutes = require("./products");
const orderRoutes = require("./orders");

const router = express.Router();

router.use("/api/auth", authRoutes);
router.use("/api/users", userRoutes);
router.use("/api/categories", categoryRoutes);
router.use("/api/products", productRoutes);
router.use("/api/carts", cartRoutes);
router.use("/api/orders", orderRoutes);

router.get("/", (req, res) => {
  res.status(200).json({
    data: {
      name: "Freshloka API",
      version: "1.0.0",
      description:
        "Marketplace lokal untuk buah, sayuran, dan kebutuhan dapur segar.",
    },
  });
});

module.exports = router;
