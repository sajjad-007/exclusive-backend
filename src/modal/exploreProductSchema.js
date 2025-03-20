const mongoose = require("mongoose")
const {Schema} = mongoose

const exploreProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    product : {
        type : Schema.Types.ObjectId,
        ref : "product"
    }

},
    {timestamps: true}
)

const exploreProductModel = mongoose.model("exploreProduct",exploreProductSchema)

module.exports = {exploreProductModel}