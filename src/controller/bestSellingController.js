const { bestSellingModel } = require("../modal/bestSellingSchema");
const { succssResponse } = require("../utilitis/apiResponse");
const { errorResponse } = require("../utilitis/ErrorResponse");

const createBestSelling = async (req, res) => {
  try {
    const { name, product } = req.body;
    if (!name || !product) {
      return res
        .status(401)
        .json(new errorResponse(401, `Credential missing`, error, null));
    }
    const createBestSellingDB = await bestSellingModel.create({
      name: name,
      product: product,
    });
    if (!createBestSellingDB) {
      return res
        .status(500)
        .json(new errorResponse(500, `Couldn't create db`, error, null));
    }
    return res
      .status(200)
      .json(
        new succssResponse(
          200,
          "Successfully created my database",
          false,
          createBestSellingDB
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new errorResponse(500, `best selling create Unsuccessfull`, error, null)
      );
  }
};
//get all best selling items
const getAllBestSelling = async (req, res) => {
  try {
    const findAllBestSellingDB = await bestSellingModel
      .find({}).populate("product");
    if (!findAllBestSellingDB) {
      return res
        .status(200)
        .json(new succssResponse(200, "Coundn't found anything", false, null));
    }
    return res
      .status(200)
      .json(
        new succssResponse(
          200,
          "Successfully found all best-selling items",
          false,
          findAllBestSellingDB
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new errorResponse(500, `best selling create Unsuccessfull`, error, null)
      );
  }
};
//get single bestSelling items
const getSingleBestSelling = async (req, res) => {
  try {
    const { id } = req.params;
    const findSingleBestSellingDB = await bestSellingModel
      .find({ _id: id })
      .populate("product");
    if (!findSingleBestSellingDB) {
      return res
        .status(200)
        .json(new succssResponse(200, "Coundn't found anything", false, null));
    }
    return res
      .status(200)
      .json(
        new succssResponse(
          200,
          "Successfully found all best-selling items",
          false,
          findSingleBestSellingDB
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new errorResponse(500, `best selling create Unsuccessfull`, error, null)
      );
  }
};
//update bestSelling
const updateBestSelling = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, product } = req.body;
    const updateBestSelling = await bestSellingModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    if (!updateBestSelling) {
      return res
        .status(401)
        .json(new errorResponse(401, `Couldn't find anything`, true, null));
    }

    return res
      .status(200)
      .json(
        new succssResponse(
          200,
          "Successfully found flash sale",
          false,
          updateBestSelling
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new errorResponse(500, `Update Unsuccessfull`, error, null));
  }
};
// delete bestSelling
const deleteBestSelling = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBestSelling = await bestSellingModel.findByIdAndDelete({_id: id});
    if (!deleteBestSelling) {
      return res
        .status(401)
        .json(new errorResponse(401, `Couldn't delete`, true, null));
    }

    return res
      .status(200)
      .json(
        new succssResponse(
          200,
          "Successfully Deleted BestSelling",
          false,
          deleteBestSelling
        )
      )
  } catch (error) {
    return res
      .status(500)
      .json(new errorResponse(500, `delete Unsuccessfull`, error, null));
  }
};

module.exports = {
  createBestSelling,
  getAllBestSelling,
  getSingleBestSelling,
  updateBestSelling,
  deleteBestSelling
};
