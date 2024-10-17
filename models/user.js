const mongoose = require("mongoose");

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

    // New fields for eCommerce functionality
    address: [{
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String,
    }],
    cart: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }],
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }],
    paymentMethods: [{
        cardType: String,
        cardNumber: String,
        expiryDate: String,
        cardHolderName: String
    }],

}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);
