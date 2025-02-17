const express = require("express")
const _  = express.Router()
const {categoryController,getCategory, updateCategory} = require("../controller/categoryController")
const { upload } = require("../middleware/multer.Middleware")


_.route("/category").post(upload.fields(
    [
        {name: "image", maxCount: 1}
    ]
) ,categoryController ).get(getCategory)

_.route("/category/:id").put(upload.fields([{name: "image", maxCount: 1}]) ,updateCategory)

module.exports = _