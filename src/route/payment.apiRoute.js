const express = require('express')
const _ = express.Router()
const payment = require("../controller/paymentController")

_.route("/success").post(payment.paymentSuccess)
_.route("/fail").post(payment.paymentFailed)
_.route("/cancel").post(payment.paymentCancel)
_.route("/ipn").post(payment.paymentIpn)

module.exports = _