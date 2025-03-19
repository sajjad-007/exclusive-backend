const { flashModel } = require("../modal/flashSaleSchema");
const {succssResponse} = require("../utilitis/apiResponse")
const {errorResponse} = require("../utilitis/ErrorResponse");

const createFlashSale = async( req,res) => {
    try {
        const {name,product} = req.body
        if(!name || !product){
            return res
            .status(401)
            .json(new errorResponse(401,`Credential Missing`,true,null))
        }
        const isExistFlashSale = await flashModel.find({name: name})
        if(isExistFlashSale?.length){
            return res
            .status(401)
            .json(new errorResponse(401,`${name} is Already exist`,true,null))
        }
        const saveFlashSale = await flashModel.create({
            name: name,
            product: product,
        })
        if(!saveFlashSale) {
            return res
            .status(401)
            .json(new errorResponse(401,`flash sale create database`,true,null))
        }
        return res
        .status(200)
        .json(new succssResponse(200,"Successfully created flash sale",false,saveFlashSale))
    } catch (error) {
        return res
            .status(500)
            .json(new errorResponse(500,`Flash Sale create Unsuccessfull`,error,null))
    }
}
//get all flash sale
const getAllFlashSale = async( req,res) => {
    try {
        const findAllFlashSale = await flashModel.find({}).populate('product')
        if(!findAllFlashSale){
            return res
            .status(401)
            .json(new errorResponse(401,`Couldn't find anything`,true,null))
        }
        
        return res
        .status(200)
        .json(new succssResponse(200,"Successfully created flash sale",false,findAllFlashSale))
    } catch (error) {
        return res
            .status(500)
            .json(new errorResponse(500,`Get method Unsuccessfull`,error,null))
    }
}
//get all flash sale
const getSingleFlashSale = async( req,res) => {
    try {
        const {id} = req.params
        const findSingleFlashSale = await flashModel.findById({_id : id}).populate('product')
        if(!findSingleFlashSale){
            return res
            .status(401)
            .json(new errorResponse(401,`Couldn't find anything`,true,null))
        }
        
        return res
        .status(200)
        .json(new succssResponse(200,"Successfully found flash sale",false,findSingleFlashSale))
    } catch (error) {
        return res
            .status(500)
            .json(new errorResponse(500,`Get single id method Unsuccessfull`,error,null))
    }
}


module.exports = {createFlashSale,getAllFlashSale,getSingleFlashSale}