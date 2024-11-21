const mongoose = require("mongoose")
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    surName: {
        type: String,
        required: true,
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
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        default: user,
        enum: {user,admin,merchent}
    },
    image: {
        type: String,
    },

},
    {timestamps: true}  
)

const userModel = mongoose.model("user", userSchema)

module.exports = {userModel}