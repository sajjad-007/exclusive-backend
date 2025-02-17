const {succssResponse} = require("../utilitis/apiResponse")
const {errorResponse} = require("../utilitis/ErrorResponse");
const { categoryModal } = require("../modal/categorySchema")
const {fileCloudinaryUpload} = require("../utilitis/cloudinary")

const categoryController = async( req,res) => {
    try {
        const {name} = req.body
        //req.files er vitore amara image er details gula pabo
        
        const realImage = req.files.image[0]
        if (!req.files) {
            return res
            .status(404)
            .json(new errorResponse(500,`Image not found !!`,true,null))
        }
        const filePath = req.files?.image[0]?.path
        const {secure_url} = await fileCloudinaryUpload(filePath)

        const saveData = await new categoryModal({
            name: name,
            image: secure_url,
        }).save()
        if (saveData) {
            return res
            .status(200)
            .json(new succssResponse(200,"Database created successful",false,null))
        }
        
        return res
            .status(200)
            .json(new succssResponse(200,"Category success",false,null))
    } catch (error) {
        return res
            .status(500)
            .json(new errorResponse(500,`category unsuccessful`,`${Error}`,null))
    }
}

// get all category
const getCategory = async(req, res) => {
    try {

        const findAllCategory = await categoryModal.find()
        if (findAllCategory?.length) {
            return res
            .status(200)
            .json(new errorResponse(200,`get category success`,null,findAllCategory))
        }
        return res
        .status(401)
        .json(new succssResponse(401,"Couldn't find anything!",false,null))
    } catch (error) {
        return res
            .status(500)
            .json(new errorResponse(500,`Error from get category`,error,null))
    }
}

// put method Update category 

const updateCategory = async(req,res) => {
    try {
        const {id} = req.params
        const {name} = req.body
        console.log(name);
        
        console.log(req.files.image);
        
        
        const findUpdateId = await categoryModal.findById(id)
        
        return res
        .status(401)
        .json(new succssResponse(401,"Update Category method success",false,null))
    } catch (error) {
        return res
        .status(500)
        .json(new errorResponse(500,`Error from get Update category`,error,null))
    }
}

module.exports = { categoryController,getCategory, updateCategory }