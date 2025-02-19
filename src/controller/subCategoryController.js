const {subCategoryModel} = require("../modal/subCategorySchema")
const {succssResponse} = require("../utilitis/apiResponse")
const {errorResponse} = require("../utilitis/ErrorResponse");

//create  sub category
const subCategory = async(req,res) =>{
    try {
        const {name,category} = req.body
        if (!name || !category) {
            return res
            .status(401)
            .json(new errorResponse(401,`Missing credential`,true,null))
        }       
        //check sub category is already exist!
        const isAlreadyExist = await subCategoryModel.find({name: name})
        if (isAlreadyExist?.length) {
            return res
            .status(401)
            .json(new errorResponse(401,`Already exist!`,true,null))
        }
        //save sub category
        const saveSubCategory = await subCategoryModel.create({
            name: name,
            category: category
        })

        if (!saveSubCategory) {
            return res
            .status(401)
            .json(new errorResponse(401,`sub category create failed!`,true,null))
        }
        return res
        .status(200)
        .json(new succssResponse(200,"Sub Category created successfully",false,saveSubCategory))
    } catch (error) {
        return res
        .status(500)
        .json(new errorResponse(500,`sub category create Unsuccessfull`,error,null))
    }
}

//get all category
const getAllSubCategory = async(req,res) =>{
    try {
        const findAllSubCategory = await subCategoryModel.find({}).populate('category')
        if (!findAllSubCategory) {
            return res
            .status(401)
            .json(new errorResponse(401,`couldn't find category`,true,null))
        }
        
        return res
        .status(200)
        .json(new succssResponse(200,"Sub Category created successfully",false,findAllSubCategory))
    } catch (error) {
        return res
        .status(500)
        .json(new errorResponse(500,`get all sub category Unsuccessfull`,true,null))
    }
}

//get a single category
const getSingleSubCategory = async(req,res) =>{
    try {
        const {subid} = req.params
        const findSingleSubCategory = await subCategoryModel.findById(subid)
        if (!findSingleSubCategory) {
            return res
            .status(401)
            .json(new errorResponse(401,`Couldn't find anything by this id`,true,null))
        }
        return res
        .status(200)
        .json(new succssResponse(200,"Successfully Get Single Sub Category ",false,findSingleSubCategory))
    } catch (error) {
        return res
        .status(500)
        .json(new errorResponse(500,`Get single sub category failed`,true,null))
    }
}
//update a single category
const updateSingleCategory = async(req,res) =>{
    try {
        const {subid} = req.params
        const updateSubCategory = await subCategoryModel.findByIdAndUpdate({_id:subid},{...req.body},{new: true})
        if (!updateSubCategory) {
            return res
            .status(401)
            .json(new errorResponse(401,`Sub category update failed`,true,null))
        }

        return res
        .status(200)
        .json(new succssResponse(200,"Successfully Updated Single Sub Category ",false,updateSubCategory))
    } catch (error) {
        return res
        .status(500)
        .json(new errorResponse(500,`Update single sub category failed`,true,null))
    }
}
//delete sub category
const deleteSubCategory = async(req,res) =>{
    try {
        const {subid} = req.params
        const deleteSubCategory = await subCategoryModel.findByIdAndDelete(subid)

        if (!deleteSubCategory) {
            return res
            .status(401)
            .json(new errorResponse(401,`Sub category delte Unsuccessfull`,true,null))
        }

        return res
        .status(200)
        .json(new succssResponse(200,"Successfully deleted sub category ",false,deleteSubCategory))
    } catch (error) {
        return res
        .status(500)
        .json(new errorResponse(500,`Error from sub category delete`,true,null))
    }
}

module.exports = {subCategory,getAllSubCategory,getSingleSubCategory,updateSingleCategory,deleteSubCategory}