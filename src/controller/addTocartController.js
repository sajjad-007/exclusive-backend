const { succssResponse } = require("../utilitis/apiResponse");
const { errorResponse } = require("../utilitis/ErrorResponse");
const { cartModel } = require("../modal/addtocartShema");

const addtoCart = async (req, res) => {
  try {
    const { product, quantity } = req.body;

    if (!product) {
      return res
        .status(401)
        .json(new errorResponse(401, `Product missing`, true, null));
    }
    //is product already exist
    const isAlreadyExist = await cartModel.find({ product: product });
    if (isAlreadyExist?.length) {
      return res
        .status(401)
        .json(
          new errorResponse(401, `This product is already exist`, true, null)
        );
    }
    //create addtoCart database

    const creatAddtocarteDB = await cartModel.create({
      user: req.user._id, // authguard.Middleware == (req.user = decoder)
      product,
      quantity,
    });
    if (!creatAddtocarteDB) {
      return res
        .status(401)
        .json(
          new errorResponse(401, `Database create Unsuccessfull`, true, null)
        );
    }
    return res
      .status(200)
      .json(
        new succssResponse(
          200,
          `AddtoCart Database create  successful`,
          false,
          creatAddtocarteDB
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new errorResponse(
          500,
          `Error from addtoCartController`,
          `${error}`,
          null
        )
      );
  }
};

// search all addtocart products
const findallAddtocart = async (req, res) => {
  try {
    // find all products from data base
    const findAllProduct = await cartModel
      .find({})
      .populate({ path: "user", select: "-password -createdAt -updatedAt" })
      .populate({ path: "product" });
    if (!findAllProduct) {
      return res
        .status(401)
        .json(new errorResponse(401, `Couldn't find anything`, true, null));
    }
    return res
      .status(200)
      .json(
        new succssResponse(
          200,
          `successfully found all addtocart product`,
          false,
          findAllProduct
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new errorResponse(500, `Error from findallAddtocart`, error, null));
  }
};
// find single addTocart
const findSingleddtocart = async (req, res) => {
  try {
    // find single products from data base
    const { id } = req.params;
    const findSingleProduct = await cartModel
      .find({ _id: id })
      .populate({ path: "user", select: "-password -createdAt -updatedAt" })
      .populate({ path: "product" });
    if (!findSingleProduct) {
      return res
        .status(401)
        .json(new errorResponse(401, `Couldn't find anything`, true, null));
    }
    // console.log(findSingleProduct)
    return res
      .status(200)
      .json(
        new succssResponse(
          200,
          `successfully found all addtocart product`,
          false,
          findSingleProduct,
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new errorResponse(500, `Error from find single Addtocart`, error, null)
      );
  }
};
// remove add to cart products
const deleteaddtocart = async (req, res) => {
  try {
    // find single products from data base
    const { id } = req.params;

    const removeSingleProduct = await cartModel
      .findOneAndDelete({ _id: id })
      .populate({ path: "user", select: "-password -createdAt -updatedAt" })
      .populate({
        path: "product",
        select:
          "-review -image -size -rating -color -discountPercentage -createdAt -updatedAt",
      });
    if (!removeSingleProduct) {
      return res
        .status(401)
        .json(
          new errorResponse(401, `Product remove unsuccessfull`, true, null)
        );
    }
    return res
      .status(200)
      .json(
        new succssResponse(
          200,
          `successfully removed addtocart's product`,
          false,
          removeSingleProduct
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new errorResponse(500, `Error from delete Addtocart`, error, null));
  }
};
const incrementAddtocart = async (req, res) => {
  try {
    const query = req.query;
    const findCart = await cartModel.findOne({
      user: req.user._id, //(req.user._id from authguard.Middleware)
      _id: query.cart,
    });
    findCart.quantity += 1;
    await findCart.save();
    return res
      .status(200)
      .json(new succssResponse(200, `Increment successfull`, false, findCart));
  } catch (error) {
    return res
      .status(500)
      .json(
        new errorResponse(500, `Error from Increment addtocart`, error, null)
      );
  }
};
const decrementAddtocart = async (req, res) => {
  try {
    const query = req.query;
    const findCart = await cartModel.findOne({
      user: req.user._id, //(req.user._id from authguard.Middleware)
      _id: query.cart,
    });
    findCart.quantity -= 1;
    await findCart.save();
    return res
      .status(200)
      .json(
        new succssResponse(
          200,
          `Decrement quantity successfull`,
          false,
          findCart
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new errorResponse(500, `Error from decrement addtocart`, error, null)
      );
  }
};

module.exports = {
  addtoCart,
  findallAddtocart,
  findSingleddtocart,
  deleteaddtocart,
  incrementAddtocart,
  decrementAddtocart,
};
