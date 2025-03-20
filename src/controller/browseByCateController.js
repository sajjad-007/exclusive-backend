const { browseCategoryModel } = require("../modal/browseCategorySchema");
const { succssResponse } = require("../utilitis/apiResponse");
const { errorResponse } = require("../utilitis/ErrorResponse");

//create BrowseByCategory
const createBrowseByCategory = async (req, res) => {
  try {
    const { name, category } = req.body;
    if (!name || !category) {
      return res
        .status(401)
        .json(new errorResponse(401, `Credential Missing`, true, null));
    }
    const isExistFlashSale = await browseCategoryModel.find({ name: name });
    if (isExistFlashSale?.length) {
      return res
        .status(401)
        .json(new errorResponse(401, `${name} is Already exist`, true, null));
    }
    const createbrowseByCategoryDb = await browseCategoryModel.create({
      name: name,
      category: category,
    });
    if (!createbrowseByCategoryDb) {
      return res
        .status(401)
        .json(
          new errorResponse(
            401,
            `Browse by category database created`,
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
          "Successfully created browse by category database",
          false,
          createbrowseByCategoryDb
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
//get all BrowseByCategory
const getAllBrowseByCategory = async (req, res) => {
  try {
    const findAllBrowseByCategoryDB = await browseCategoryModel
      .find({})
      .populate("category");
    if (!findAllBrowseByCategoryDB) {
      return res
        .status(200)
        .json(new succssResponse(200, "Coundn't found anything", false, null));
    }
    return res
      .status(200)
      .json(
        new succssResponse(
          200,
          "Successfully found all browseByCategory items",
          false,
          findAllBrowseByCategoryDB
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new errorResponse(
          500,
          `browseByCategory create Unsuccessfull`,
          error,
          null
        )
      );
  }
};
//get single BrowseByCategory
const getSingleBrowseByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const findSingleBrowseByCategory = await browseCategoryModel
      .findById({ _id: id })
      .populate("category");
    if (!findSingleBrowseByCategory) {
      return res
        .status(401)
        .json(new errorResponse(401, `Couldn't find anything`, true, null));
    }

    return res
      .status(200)
      .json(
        new succssResponse(
          200,
          "Successfully found BrowseByCategory",
          false,
          findSingleBrowseByCategory,
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
//update BrowseByCategory
const updateBrowseByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category } = req.body;
    const updateBrowseByCategory = await browseCategoryModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    ).populate("category")
    if (!updateBrowseByCategory) {
      return res
        .status(401)
        .json(new errorResponse(401, `Couldn't find anything`, true, null));
    }

    return res
      .status(200)
      .json(
        new succssResponse(
          200,
          "Successfully updated my BrowseByCategory",
          false,
          updateBrowseByCategory
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new errorResponse(500, `Update Unsuccessfull`, error, null));
  }
};
// delete BrowseByCategory
const deleteBrowseByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBrowseByCategory = await browseCategoryModel.findByIdAndDelete({ _id: id });
    if (!deleteBrowseByCategory) {
      return res
        .status(401)
        .json(new errorResponse(401, `Couldn't delete`, true, null));
    }

    return res
      .status(200)
      .json(
        new succssResponse(
          200,
          "Successfully Deleted my BrowseByCategory ",
          false,
          deleteBrowseByCategory,
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new errorResponse(500, `delete Unsuccessfull`, error, null));
  }
};
module.exports = {
  createBrowseByCategory,
  getAllBrowseByCategory,
  getSingleBrowseByCategory,
  updateBrowseByCategory,
  deleteBrowseByCategory,
};
