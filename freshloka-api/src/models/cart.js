const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          required: true,
          validate: {
            validator: async function (value) {
              // Validasi agar quantity tidak lebih dari stok produk
              const product = await mongoose
                .model("Product")
                .findById(this.product);
              if (product.stock < value) {
                // Menampilkan stok yang tersedia dalam pesan error
                throw new Error(
                  `Quantity cannot be greater than product stock. Available stock: ${product.stock}`
                );
              }
              return true; // Jika validasi berhasil
            },
            message: "Quantity cannot be greater than product stock",
          },
        },
      },
    ],
    status: {
      type: String,
      enum: ["CHECKOUT", "PROGRESS", "COMPLETED", "CANCELED"],
      default: "CHECKOUT",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: "carts",
    timestamps: true,
  }
);
const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
