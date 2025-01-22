const express = require("express");
const authRoutes = require("./auth");
const productRoutes = require("./products");
const categoryRoutes = require("./categories");

const router = express.Router();

router.use("/api/auth", authRoutes);
router.use("/api/products", productRoutes);
router.use("/api/categories", categoryRoutes);

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
