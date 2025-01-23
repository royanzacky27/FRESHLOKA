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
              const product = await mongoose
                .model("Product")
                .findById(this.product);
              if (product.stock < value) {
                throw new Error(
                  `Quantity cannot be greater than product stock. Available stock: ${product.stock}`
                );
              }
              return true;
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
      unique: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: "carts",
    timestamps: true,
  }
);

// Tambahkan index unik pada createdBy jika belum ada
cartSchema.index({ createdBy: 1 }, { unique: true });

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
