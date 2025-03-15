const { succssResponse } = require("../utilitis/apiResponse")
const { errorResponse } = require("../utilitis/ErrorResponse")
const {bannerModel} = require("../modal/bannerSchema")
const { fileCloudinaryUpload, fileDeleteCloudinary } = require("../utilitis/cloudinary")

const createBanner = async(req,res) =>{
    try {
        
        const {title} = req.body
        if(!title){
            return res
            .status(404)
            .json(new errorResponse(404,`title is missing`,true,null))
        };
        if(!req.files.image){
            return res
            .status(401)
            .json(new errorResponse(401,`Image is missing`,true,null))
        }
        //find is title is already exist in database 
        const isAlreadyExist = await bannerModel.find({title})
        if(isAlreadyExist?.length){
            return res
            .status(401)
            .json(new errorResponse(402,`${title} is already exist`,true,null))
        }

        //upload image on cloudinary
        const imgPath = req.files?.image[0].path
        
        const {secure_url} =  await fileCloudinaryUpload(imgPath)
        // create a banner database 
        const createBannerDb = await bannerModel.create({
            title: title,
            image: secure_url,
        })
        if(!createBannerDb) {
            return res
            .status(401)
            .json(new errorResponse(401,`Database create Unsuccessfull`,true,null))
        }
        return res
        .status(200)
        .json(new succssResponse(200,"Banner create successfull",false,createBannerDb))        
    } catch (error) {
        return res
        .status(500)
        .json(new errorResponse(500,`Error, create banner Controller`,error,null))
    }
}
//get all banner
const getAllBanner = async(req,res) =>{
    try {
        //find all banner
        const searchAllBanner = await bannerModel.find({})
        if(!searchAllBanner){
            return res
            .status(401)
            .json(new errorResponse(401,`search all banner failed`,true,null))
        }
        return res
        .status(200)
        .json(new succssResponse(200,"All Banner retrive successfull",false,searchAllBanner))
    } catch (error) {
        return res
        .status(500)
        .json(new errorResponse(500,`Error,From get all banner`,error,null))
    }
}
//get single banner
const getSingleBanner = async(req,res) =>{
    try {
        const {id} = req.params
        //find all banner
        const searchSingleBanner = await bannerModel.findOne({_id: id})
        if(!searchSingleBanner){
            return res
            .status(401)
            .json(new errorResponse(401,`search single banner failed`,true,null))
        }
        return res
        .status(200)
        .json(new succssResponse(200,"Single Banner retrive successfull",false,searchSingleBanner))
    } catch (error) {
        return res
        .status(500)
        .json(new errorResponse(500,`Error,From get single banner`,error,null))
    }
}
//update banner
const updateBanner = async(req,res) =>{
    try {
        const {id} = req.params
        const{title} = req.body

        if(!title){
            return res
            .status(404)
            .json(new errorResponse(404,`title is missing`,true,null))
        };
        //upload title on an emty array
        const updateNameImg = []
        if(title){
            updateNameImg.title = title
        }
        if(!req.files.image){
            return res
            .status(401)
            .json(new errorResponse(401,`Image is missing`,true,null))
        }
        //find my old img
        const findMyDatabase = await bannerModel.findById(id)
        if(!findMyDatabase){
            return res
            .status(401)
            .json(new errorResponse(401,`Couldn't find this id from database`,true,null))
        }
        if(req.files.image){
            //new Img path
            const coloudinaryPath  = req.files.image[0].path
            //old img path
            const imgSplit = findMyDatabase.image.split('/')
            const oldImgCloudPath = imgSplit[imgSplit.length -1].split(".")[0]
            //now delete my old img from cloudinary
            const delImgFromCloud = await fileDeleteCloudinary(oldImgCloudPath)
            if(delImgFromCloud){
                const {secure_url} = await fileCloudinaryUpload(coloudinaryPath)
                updateNameImg.image = secure_url
            }
        }
        //now save this emty array on database
        const saveDatabase = await bannerModel.findByIdAndUpdate({_id: id},{...updateNameImg},{new:true})
        if(!saveDatabase){
            return res
            .status(500)
            .json(new errorResponse(500,`Couldn't save this on database`,true,null))
        }
        return res
        .status(200)
        .json(new succssResponse(200,"Banner update successfull",false,saveDatabase))
    } catch (error) {
        return res
        .status(500)
        .json(new errorResponse(500,`Error,Update banner`,error,null))
    }
}
//delete banner
const deletBanner = async ( req,res) =>{
    try {
        const {id} = req.params
        const findBanner = await bannerModel.findById(id)
        if (!findBanner) {
            return res
            .status(401)
            .json(new errorResponse(401,`Couldn't delete this banner`,true,null))
        }
        if(findBanner){
            const imgSplit = findBanner.image.split('/')
            const cloudPath = imgSplit[imgSplit.length -1 ].split('.')[0]
            const delImgFromCloud = await fileDeleteCloudinary(cloudPath)
            if(!delImgFromCloud){
                return res
                .status(401)
                .json(new errorResponse(401,`img is deleted from cloudinary`,true,null))
            }
            if(delImgFromCloud){
                const deleteImgFromDB = await bannerModel.findByIdAndDelete(id)
            }
            
            
        }
        return res
        .status(200)
        .json(new succssResponse(200,"banner Deleted successfully",false,null))
    } catch (error) {
        return res
        .status(500)
        .json(new errorResponse(500,`banner delete Unsuccessfull`,error,null))
    }
}

module.exports = {createBanner,getAllBanner,getSingleBanner,updateBanner,deletBanner}

