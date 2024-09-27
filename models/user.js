const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    ppImage: {
        type: String,
    },
    role: {
        type: String,
        default: "user"
    },
    Token: {},
    resetToken: {},
    expireToken: {},

}, { timestamps: true });

module.exports = mongoose.model("user", userSchema)