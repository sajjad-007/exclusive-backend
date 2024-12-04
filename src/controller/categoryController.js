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

module.exports = { categoryController }