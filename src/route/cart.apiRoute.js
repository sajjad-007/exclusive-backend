const express = require('express')
const _ = express.Router()
const { createCartController } = require('../controller/cartController')
const { authGuard } = require('../middleware/authguard.Middleware')

_.route("/cart").post(authGuard,createCartController)
module.exports = _