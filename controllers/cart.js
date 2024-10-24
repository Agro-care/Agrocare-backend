const User = require("../models/userModel"); 
const Product = require("../models/productModel");

exports.addToCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId, quantity } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const existingCartItem = user.cart.find(item => item.productId.toString() === productId);

        if (existingCartItem) {
            existingCartItem.quantity += quantity;
        } else {
            user.cart.push({ productId, quantity });
        }

        await user.save();
        res.status(200).json({ message: "Product added to cart", cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: "Failed to add to cart", error });
    }
};
