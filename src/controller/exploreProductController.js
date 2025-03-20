const { exploreProductModel } = require("../modal/exploreProductSchema");
const { succssResponse } = require("../utilitis/apiResponse");
const { errorResponse } = require("../utilitis/ErrorResponse");

//create Explore Product
const createExploreProduct = async (req, res) => {
  try {
    const { name, product } = req.body;
    if (!name || !product) {
      return res
        .status(401)
        .json(new errorResponse(401, `Credential Missing`, true, null));
    }
    const isExistExploreProduct = await exploreProductModel.find({
      name: name,
    });
    if (isExistExploreProduct?.length) {
      return res
        .status(401)
        .json(new errorResponse(401, `${name} is Already exist`, true, null));
    }
    const createExploreProductDB = await exploreProductModel.create({
      name: name,
      product: product,
    });
    if (!createExploreProductDB) {
      return res
        .status(401)
        .json(
          new errorResponse(
            401,
            `Couldn't create Explore Product database`,
            true,
            null
          )
        );
    }
    return res
      .status(200)
      .json(
        new succssResponse(
          200,
          "Successfully created Explore Product",
          false,
          createExploreProductDB
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new errorResponse(
          500,
          `Browse By Category create Unsuccessfull`,
          error,
          null
        )
      );
  }
};
//get all Explore Product
const getAllExploreProduct = async (req, res) => {
  try {
    const findAllExploreProduct = await exploreProductModel
      .find({})
      .populate("product");
    if (!findAllExploreProduct) {
      return res
        .status(200)
        .json(new succssResponse(200, "Coundn't found anything", false, null));
    }
    return res
      .status(200)
      .json(
        new succssResponse(
          200,
          "Successfully found all explore product",
          false,
          findAllExploreProduct
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new errorResponse(
          500,
          `ExploreProduct create Unsuccessfull`,
          error,
          null
        )
      );
  }
};
//get single Explore Product
const getSingleExploreProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const findSingleExploreProduct = await exploreProductModel
      .findById({ _id: id })
      .populate("product");
    if (!findSingleExploreProduct) {
      return res
        .status(401)
        .json(new errorResponse(401, `Couldn't find anything`, true, null));
    }

    return res
      .status(200)
      .json(
        new succssResponse(
          200,
          "Successfully found ExploreProduct",
          false,
          findSingleExploreProduct
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new errorResponse(
          500,
          `Get single id method Unsuccessfull`,
          error,
          null
        )
      );
  }
};
//update Explore Product
const updateExploreProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, product } = req.body;
    const updateExploreProduct = await exploreProductModel
      .findByIdAndUpdate({ _id: id }, { ...req.body }, { new: true })
      .populate("product");
    if (!updateExploreProduct) {
      return res
        .status(401)
        .json(new errorResponse(401, `Couldn't find anything`, true, null));
    }

    return res
      .status(200)
      .json(
        new succssResponse(
          200,
          "Successfully updated my ExploreProduct",
          false,
          updateExploreProduct
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new errorResponse(500, `Update Unsuccessfull`, error, null));
  }
};
// delete Explore Product
const deleteExploreProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteExploreProduct = await exploreProductModel.findByIdAndDelete({
      _id: id,
    });
    if (!deleteExploreProduct) {
      return res
        .status(401)
        .json(new errorResponse(401, `Couldn't delete`, true, null));
    }

    return res
      .status(200)
      .json(
        new succssResponse(
          200,
          "Successfully Deleted my Explore Product ",
          false,
          deleteExploreProduct
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new errorResponse(500, `delete Unsuccessfull`, error, null));
  }
};

module.exports = {
  createExploreProduct,
  getAllExploreProduct,
  getSingleExploreProduct,
  updateExploreProduct,
  deleteExploreProduct,
};
