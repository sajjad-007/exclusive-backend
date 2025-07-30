const { succssResponse } = require("../utilitis/apiResponse");
const { errorResponse } = require("../utilitis/ErrorResponse");
const { categoryModal } = require("../modal/categorySchema");
const {
  fileCloudinaryUpload,
  fileDeleteCloudinary,
} = require("../utilitis/cloudinary");

const categoryController = async (req, res) => {
  try {
    const { name } = req.body;
    //req.files er vitore amara image er details gula pabo

    const realImage = req.files.image[0];
    if (!req.files) {
      return res
        .status(404)
        .json(new errorResponse(500, `Image not found !!`, true, null));
    }
    const filePath = req.files?.image[0]?.path;
    //upload file on cloudinary
    const { secure_url } = await fileCloudinaryUpload(filePath);

    const saveData = await new categoryModal({
      name: name,
      image: secure_url,
    }).save();
    if (saveData) {
      return res
        .status(200)
        .json(
          new succssResponse(200, "Database created successful", false, null)
        );
    }

    return res
      .status(200)
      .json(new succssResponse(200, "Category success", false, null));
  } catch (error) {
    return res
      .status(500)
      .json(new errorResponse(500, `category unsuccessful`, `${Error}`, null));
  }
};

// get all category
const getCategory = async (req, res) => {
  try {
    //populate means referance of my sub category. It shows how many sub category I have (and their every single datails) under one specefic category.
    const findAllCategory = await categoryModal
      .find({})
      .populate("subCategory");
    if (findAllCategory?.length) {
      return res
        .status(200)
        .json(
          new errorResponse(200, `get category success`, null, findAllCategory)
        );
    }
    return res
      .status(401)
      .json(new succssResponse(401, "Couldn't find anything!", false, null));
  } catch (error) {
    return res
      .status(500)
      .json(new errorResponse(500, `Error from get category`, error, null));
  }
};

// put method Update category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updateImgName = {};
    if (name) {
      updateImgName.name = name;
    }
    //**if we want to see form-data value(postman) then we must use multer
    //user er dewya id (req.params) diya database {categoryModal.findById(id)} e khujbe
    const findUpdateId = await categoryModal.findById(id);
    if (!findUpdateId) {
      return res
        .status(500)
        .json(
          new errorResponse(
            500,
            `Couldn't find anything related this Id`,
            true,
            null
          )
        );
    }
    if (req.files?.image) {
      //new image path
      const { path } = req.files?.image[0];
      //old imgae path
      const oldImg = findUpdateId.image.split("/");
      //this path is for deleting image from cloudinary
      const cloudinaryPathImg = oldImg[oldImg.length - 1].split(".")[0];
      const deleteCloudinaryItem = await fileDeleteCloudinary(
        cloudinaryPathImg
      );
      if (deleteCloudinaryItem) {
        const { secure_url } = await fileCloudinaryUpload(path);
        updateImgName.image = secure_url;
      }
    }
    const categoryUpdated = await categoryModal.findOneAndUpdate(
      { _id: id },
      { ...updateImgName },
      { new: true }
    );

    return res
      .status(200)
      .json(
        new succssResponse(
          200,
          "Update Category method success",
          false,
          categoryUpdated
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new errorResponse(500, `Error from get Update category`, error, null)
      );
  }
};

//get a single category
const getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const findSingleCategory = await categoryModal
      .findById(id)
      .populate(["subCategory"]);
    if (!findSingleCategory) {
      return res
        .status(500)
        .json(new errorResponse(500, `Couldn't find this id`, error, null));
    }
    return res
      .status(200)
      .json(
        new succssResponse(
          200,
          "Single Category found successfully",
          false,
          findSingleCategory
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new errorResponse(
          500,
          `Error single category couldn't found`,
          error,
          null
        )
      );
  }
};
//delete a single category

const deletCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const delteCategory = await categoryModal.findByIdAndDelete(id);
    if (!delteCategory) {
      return res
        .status(401)
        .json(
          new errorResponse(401, `Couldn't delete this category`, true, null)
        );
    }
    return res
      .status(200)
      .json(
        new succssResponse(
          200,
          "Category Deleted successfully",
          false,
          delteCategory
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new errorResponse(500, `Category delete Unsuccessfull`, error, null)
      );
  }
};

module.exports = {
  categoryController,
  getCategory,
  updateCategory,
  getSingleCategory,
  deletCategory,
};
