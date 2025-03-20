const express = require("express");
const {
  createBrowseByCategory,
  getAllBrowseByCategory,
  getSingleBrowseByCategory,
  updateBrowseByCategory,
  deleteBrowseByCategory,
} = require("../controller/browseByCateController");

const _ = express.Router();

_.route("/browseBycategory")
  .post(createBrowseByCategory)
  .get(getAllBrowseByCategory);
  
_.route("/browseBycategory/:id")
  .get(getSingleBrowseByCategory)
  .put(updateBrowseByCategory)
  .delete(deleteBrowseByCategory);
module.exports = _;
