const passport = require("passport");
const TokenBlacklist = require("../models/token");

// Middleware autentikasi menggunakan Passport
const authenticateToken = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      console.error("Error during authentication:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!user) {
      return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }

    // Simpan user ke dalam req untuk akses berikutnya
    req.user = user;
    next();
  })(req, res, next);
};

// Middleware untuk memeriksa hak akses admin
const checkAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({
      message: "Access denied. Admin privileges required.",
    });
  }

  next(); // Lanjutkan ke handler jika pengguna adalah admin
};

const checkTokenBlacklist = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const isBlacklisted = await TokenBlacklist.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: "Token is no longer valid" });
    }

    next();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// Ekspor middleware sebagai objek
module.exports = {
  authenticateToken,
  checkAdmin,
  checkTokenBlacklist,
};
