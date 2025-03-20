const express = require("express");
const {
  createBestSelling,
  getAllBestSelling,
  getSingleBestSelling,
  updateBestSelling,
  deleteBestSelling,
} = require("../controller/bestSellingController");
const _ = express.Router();

_.route("/bestSelling").post(createBestSelling).get(getAllBestSelling);
_.route("/bestSelling/:id")
  .get(getSingleBestSelling)
  .put(updateBestSelling)
  .delete(deleteBestSelling);

module.exports = _;
