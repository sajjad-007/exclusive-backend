const express = require("express");
const {
  createFlashSale,
  getAllFlashSale,
  getSingleFlashSale,
} = require("../controller/flashController");
const _ = express.Router();

_.route("/flash").post(createFlashSale).get(getAllFlashSale);
_.route("/flash/:id").get(getSingleFlashSale)

module.exports = _;
