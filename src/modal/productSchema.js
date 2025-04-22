const mongoose = require('mongoose')
const {Schema} = mongoose

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    discountPercentage: {
        type: Number,
        required: true,
    },
    stock: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        requried: true,
        trim: true,

    },
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    size: {
        type: String,
        required: true,
        default: "S",
        enum: ["XS","S","M","L","XL"]
    },
    // review: [
    //     {
    //         comment:{
    //             type: String,
    //             trim: true
    //         },
    //         rating: {
    //             type: String,
    //         }
    //     }
    // ],
    review: {
        type: String,
        required: true,
    },
    image: [{
        type: String,
        required: true,
        trim: true
    }],
    category: {
        type: Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: "category"
    },
    subCategory: {
        type: Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: "subCategory"
    },

    
},
    {timestamps  : true}
)

const productModel = mongoose.model('product',productSchema)

module.exports = {productModel}