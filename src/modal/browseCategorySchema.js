const mongoose = require('mongoose')

const {Schema} = mongoose

const browseByCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,

    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
    }
},
    {timestamps : true}
)

const browseCategoryModel = mongoose.model("browseByCategory",browseByCategorySchema)

module.exports = {browseCategoryModel}