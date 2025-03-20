const express = require("express");
const _ = express.Router();

const {
  createExploreProduct,
  getAllExploreProduct,
  getSingleExploreProduct,
  updateExploreProduct,
  deleteExploreProduct,
} = require("../controller/exploreProductController");

_.route("/explore-product")
  .post(createExploreProduct)
  .get(getAllExploreProduct);

_.route("/explore-product/:id")
  .get(getSingleExploreProduct)
  .put(updateExploreProduct)
  .delete(deleteExploreProduct);

module.exports = _;
