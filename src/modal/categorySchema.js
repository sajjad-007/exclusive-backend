const mongoose  = require("mongoose")
const {Schema} = mongoose

const categorySchema = new Schema( {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
    },
    subCategory: [
        {
            type: Schema.Types.ObjectId,
            ref : 'subCategory',
        }
    ],
}, 
    {timestamps: true},
)

const categoryModal = mongoose.model("category",categorySchema)

module.exports = { categoryModal }