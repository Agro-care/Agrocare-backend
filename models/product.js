const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: String,
        required: true,
    },
    images: [{
        type: String, 
    }],
    brand: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    specifications: {
        type: Map,
        of: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true });

module.exports = mongoose.model("product", productSchema);
