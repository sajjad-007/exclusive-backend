const express = require("express")
const { subCategory,getAllSubCategory, getSingleSubCategory ,updateSingleCategory,deleteSubCategory} = require("../controller/subCategoryController")
const _  = express.Router()

_.route('/sub-category').post(subCategory).get(getAllSubCategory)
_.route('/sub-category/:subid').get(getSingleSubCategory).put(updateSingleCategory).delete(deleteSubCategory)

module.exports = _