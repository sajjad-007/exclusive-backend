const mongoose = require('mongoose');
const {Schema} = mongoose;

const bestSellingSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product',
    }

},
    {timestamps: true}
)

const bestSellingModel = mongoose.model("bestSelling",bestSellingSchema)

module.exports = {bestSellingModel}