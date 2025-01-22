const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0, // Total harga produk dalam order
    },
    deliveryTime: {
      type: Number, // dalam menit
      required: true,
    },
    deliveryFee: {
      type: Number,
      required: true,
      default: 10000, // Fee default untuk 30 menit
    },
    totalAmount: { type: Number },
    status: {
      type: String,
      enum: ["PENDING", "DELIVERED", "COMPLETED", "CANCELED"],
      default: "PENDING",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: "orders",
    timestamps: true,
  }
);

orderSchema.index({ cart: 1, createdBy: 1 }, { unique: true });

orderSchema.pre("save", async function (next) {
  try {
    const deliveryTime = this.deliveryTime;
    let deliveryFee = 10000;

    // Hitung biaya pengiriman
    if (deliveryTime > 30) {
      const additionalTime = Math.ceil((deliveryTime - 30) / 15);
      deliveryFee += additionalTime * 5000; // Tambahkan biaya per 15 menit
    }

    this.deliveryFee = deliveryFee;

    // Ambil cart dan hitung total harga produk
    const cart = await mongoose
      .model("Cart")
      .findById(this.cart)
      .populate("items.product");

    if (!cart) {
      throw new Error("Cart not found");
    }

    let totalProductPrice = 0;
    cart.items.forEach((item) => {
      totalProductPrice += item.product.price * item.quantity;
    });

    this.totalPrice = totalProductPrice;
    this.totalAmount = totalProductPrice + this.deliveryFee;

    next();
  } catch (error) {
    next(error);
  }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
