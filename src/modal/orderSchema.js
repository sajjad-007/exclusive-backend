const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      // required: true,
    },
    cartItem: [
      {
        type: Schema.Types.ObjectId,
        ref: "cart",
        required: true,
      },
    ],
    customerInfo: {
      firstName: {
        type: String,
        trim: true,
      },
      company: {
        type: String,
        trim: true,
      },
      address: {
        type: String,
        required: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      district: {
        type: String,
        required: true,
        trim: true,
        default: "Dhaka",
      },
      phoneNumber: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        trim: true,
      },
      postcode: {
        type: Number,
      },
    },
    paymentInfo: {
      paymentmethod: {
        type: String,
        required: true,
      },
      ispaid: {
        type: Boolean,
        default: false,
      },
      valId: {
        type: String,
      },
      tranId: {
        type: String,
        trim: true,
      },
    },
    status: {
      type: String,
      enum: ["pending", "processing", "deliverd", "cancel"],
      default: "pending",
      required: true,
      trim: true,
    },
    subTotal: {
      type: Number,
      default: 0,
    },
    totalQuantity: {
      type: Number,
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("order", orderSchema);

module.exports = { orderModel };
