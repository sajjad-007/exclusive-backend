const mongoose = require('mongoose')
const {Schema} = mongoose

const subCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "category"
    },
    product: [
        {
            type: Schema.Types.ObjectId,
            ref : 'product',
        }
    ],

},
    {timestamps : true}
)

const subCategoryModel =  mongoose.model("subCategory",subCategorySchema)

module.exports = {subCategoryModel}