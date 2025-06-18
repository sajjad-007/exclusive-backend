const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    cartUser: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: "user",
    },
    cartProduct: {
      type: Schema.Types.ObjectId,
      trim: true,
      required: true,
      ref: "product",
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    totalPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

const cartModel = mongoose.model("cart", cartSchema);

module.exports = { cartModel };
