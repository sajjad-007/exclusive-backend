const {succssResponse} = require("../utilitis/apiResponse")
const {errorResponse} = require("../utilitis/ErrorResponse");
const {productModel} = require("../modal/productSchema");
const { fileCloudinaryUpload, fileDeleteCloudinary } = require("../utilitis/cloudinary");

const createProduct = async(req,res) =>{
    try {
        const {name,description,price,rating,stock,color,size} = req.body
        
        //checking credential
        if (!name || !description || !price || !stock || !color || !rating || !size) {
            return res
            .status(401)
            .json(new errorResponse(401,`Credential missing!`,true,null))
        }
        //check is product already exist in database
        const isAlreadyExist = await productModel.find({name:name})
        if (isAlreadyExist?.length) {
            return res
            .status(401)
            .json(new errorResponse(401,`${name} product is already exist`,true,null))
            
        }
        if (!req.files) {
            return res
            .status(401)
            .json(new succssResponse(401,"Image not found product create",true,null))  
        }
        //emty array for store secure_url for database
        //Upload new image to cloudinary
        const cloudinaryImgUrl = [];
        const uploaderCloudinary = async(imagePath)=>{
            const {secure_url} = await fileCloudinaryUpload(imagePath)
            cloudinaryImgUrl.push(secure_url)
        }
        for (let image of req.files?.image) {
           await uploaderCloudinary(image.path)  
        }
        //create product database
        const createProductDb = await productModel.create({
            name: name,
            description: description,
            price: price,
            stock: stock,
            color: color,
            rating: rating,
            image: cloudinaryImgUrl,
        })
        if (!createProductDb) {
            return res
            .status(401)
            .json(new errorResponse(401,`Product Database create failed`,true,null))
            
        }
        
        return res
        .status(200)
        .json(new succssResponse(200,"Product create successfull",false,createProductDb))        
    } catch (error) {
        return res
        .status(500)
        .json(new errorResponse(500,`Error, from Product category`,error,null))
    }
}
//get all product
const getAllProduct = async(req,res)=>{
    try {
        //find all product
        const findAllProduct = await productModel.find({})
        if (!findAllProduct) {
            return res
            .status(401)
            .json(new errorResponse(401,`Couldn't find my product`,true,null))
        }
        return res
        .status(200)
        .json(new succssResponse(200,"Data Retrive successfull",false,findAllProduct))   
    } catch (error) {
        return res
        .status(500)
        .json(new errorResponse(500,`Error, from getAllProduct category`,error,null))
    }
}
//get single product
const getSingleProduct = async(req,res)=>{
    try {
        const {id} = req.params
        const searchSingleProduct = await productModel.findById(id)
        if (!searchSingleProduct) {
            return res
            .status(401)
            .json(new errorResponse(401,`Couldn't find product`,true,null))
        }
        return res
        .status(200)
        .json(new succssResponse(200,"Successfully retrive product",false,searchSingleProduct))   
    } catch (error) {
        return res
        .status(500)
        .json(new errorResponse(500,`Error, from get single product failed`,error,null))
    }
}
//update product information
const updateProductInfo = async(req,res)=>{
    try {
        const {id} = req.params
        const updateProductInfo = await productModel.findByIdAndUpdate(
            {_id:id},{...req.body},{new:true}
        ).select('-image')
        if (!updateProductInfo) {
            return res
            .status(401)
            .json(new errorResponse(401,`Couldn't update product information`,true,null))
        }
        return res
        .status(200)
        .json(new succssResponse(200,"Successfully update product information",false,updateProductInfo))   
    } catch (error) {
        return res
        .status(500)
        .json(new errorResponse(500,`Error, from  product info update failed`,error,null))
    }
}
//update product Image
const updateProductImage = async(req,res)=>{
    try {
        const {id} = req.params
        //product's image url
        const {imageId} = req.body

        if(!imageId){
            return res
            .status(401)
            .json(new errorResponse(401,`Couldn't find image id`,true,null))
        }
        if (!req.files) {
            return res
            .status(401)
            .json(new errorResponse(401,`Couldn't find multer image`,true,null))
            
        }
        
        // delete old image from cloudinary
        for(let img of imageId){
            const oldImgSplit = img.split('/')
            const oldImgUrl = oldImgSplit[oldImgSplit.length -1].split('.')[0]
             await fileDeleteCloudinary(oldImgUrl)
           
        }
        // upload new img to cloudinary
        const cloudNewImgUp = []
        for(let img of req.files.image){
            const {secure_url} = await fileCloudinaryUpload(img.path)
            cloudNewImgUp.push(secure_url)
            
        }
        // console.log(cloudNewImgUp);
        
        //delete image from database
        const findOldImgDb = await productModel.findById(id)
        if(!findOldImgDb){
            return res
            .status(500)
            .json(new errorResponse(500,`Couldn't find database`,true,null))
        };

        //(suppose we have 3 images in our database) suppose ei 3 ta image er modde 2 ta img delte hobe 1 ta img database e remaining thakbe
        for(let oldImg of imageId) {
            //pull() method to delete specefic url from database
            const deleteOldImg = await  findOldImgDb.image.pull(oldImg)
            
        }
        //remaining thaka 1 ta img (findOldImgFromDb.image) ke spread kore database e save korte hobe
        findOldImgDb.image = [...findOldImgDb.image , ...cloudNewImgUp]
        
        const check = await findOldImgDb.save()
        if (!check) {
            return res
            .status(401)
            .json(new errorResponse(401,`Couldn't save images in our database`,true,null))
        }
        return res
        .status(200)
        .json(new succssResponse(200,"Successfully update product image",false,check))   
    } catch (error) {
        return res
        .status(500)
        .json(new errorResponse(500,`Error, from update product image failed`,error,null))
    }
}

module.exports = {createProduct,getAllProduct,getSingleProduct,updateProductInfo,updateProductImage}