const mongoose = require('mongoose')
const {Schema} = mongoose

const bannerSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,        
    },
    image: {
        type: String,
        required: true,
        trim: true,
    }
},
    {timestamps : true}
)

const bannerModel = mongoose.model("banner",bannerSchema)

module.exports = {bannerModel}