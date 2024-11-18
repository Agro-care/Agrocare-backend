const mongoose = require("mongoose");
const { Schema, Types } = mongoose; // Import Types for ObjectId

const ProductSchema = new Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    currency: { 
        type: String, 
        default: 'USD' 
    },
    farmer_id: { 
        type: String, 
        required: true 
    },
    location: { 
        type: String, 
        required: true 
    },
    stock: { 
        type: Number, 
        required: true, 
        default: 0 
    },
    unit: { 
        type: String, 
        required: true 
    },
    harvest_date: { 
        type: Date, 
        required: true 
    },
    shipping_cost: { 
        type: Number, 
        default: 0 
    },
    category: { 
        type: String, 
        required: true 
    },
    image: { 
        type: String, 
        required: true 
    },
    brand: { 
        type: String, 
        required: true 
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
        of: String 
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
