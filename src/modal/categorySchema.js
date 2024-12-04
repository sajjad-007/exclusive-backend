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
    }
}, 
    {timestamps: true},
)

const categoryModal = mongoose.model("category",categorySchema)

module.exports = { categoryModal }