const express = require("express");
const { authGuard } = require("../middleware/authguard.Middleware");
const { placeOrder } = require("../controller/orderController");
const _ = express.Router();

_.route("/order").post(authGuard, placeOrder);

module.exports = _;
