require("dotenv").config();

const express = require("express");
const User = require("../models/user");
const {
  authenticateToken,
  checkAdmin,
  checkTokenBlacklist,
} = require("../config/middlewares");

const router = express.Router();

router.get(
  "/",
  authenticateToken,
  checkAdmin,
  checkTokenBlacklist,
  async (req, res) => {
    try {
      const users = await User.find();
      return res.json({
        message: "Successfully retrieved user data!",
        data: users,
      });
    } catch (error) {
      console.error("Error retrieving users data:", error);
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }
);

module.exports = router;
