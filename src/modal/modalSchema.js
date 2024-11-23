const mongoose = require("mongoose")
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    password: {
        type: Number,
        required: true,
        trim: true
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
    },

},
    {timestamps: true}  
)

const userModel = mongoose.model("user", userSchema)

module.exports = { userModel }