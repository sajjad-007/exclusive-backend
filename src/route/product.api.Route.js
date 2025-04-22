const express = require("express");
const _ = express.Router();
const {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProductInfo,
  updateProductImage,
  deleteProduct,
} = require("../controller/productController");
const { upload } = require("../middleware/multer.Middleware");

_.route("/product")
  .post(upload.fields([{ name: "image", maxCount: 10 }]), createProduct)
  .get(getAllProduct);
_.route("/product/:id")
  .get(getSingleProduct)
  .put(updateProductInfo)
  .delete(deleteProduct);
_.route("/product-img/:id").put(
  upload.fields([{ name: "image", maxCount: 10 }]),
  updateProductImage
);
module.exports = _;
