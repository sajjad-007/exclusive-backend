const express = require("express");
const {
  createFlashSale,
  getAllFlashSale,
  getSingleFlashSale,
  updateFlashSale,
  deleteFlashSale,
} = require("../controller/flashController");
const _ = express.Router();

_.route("/flash").post(createFlashSale).get(getAllFlashSale);
_.route("/flash/:id").get(getSingleFlashSale).put(updateFlashSale).delete(deleteFlashSale)

module.exports = _;
