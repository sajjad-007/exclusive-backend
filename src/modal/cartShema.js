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
    totalPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: true }
);

const cartModel = mongoose.model("cart", cartSchema);

module.exports = { cartModel };
