const mongoose = require("mongoose")
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
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
    permanentAddress: {
        type: String,
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    otp : {
        type : Number,
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
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