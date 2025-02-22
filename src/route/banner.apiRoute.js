const express = require('express')
const _ = express.Router()
const {createBanner,getAllBanner,getSingleBanner,updateBanner,deletBanner} = require("../controller/bannerController")
const { upload } = require('../middleware/multer.Middleware')


_.route('/banner').post(upload.fields(
    [
        {name: "image", maxCount: 1}
    ]
),createBanner).get(getAllBanner)

_.route("/banner/:id").get(getSingleBanner).put(upload.fields(
    [
        {name: "image", maxCount: 1}
    ]
),updateBanner).delete(deletBanner)

module.exports = _