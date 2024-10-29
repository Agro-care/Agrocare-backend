const User = require('../models/user');
const Product = require('../models/product');

// Admin Profile Management
exports.getAdminProfile = async (req, res) => {
    try {
        const admin = await User.findById(req.user._id).select("-password");
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve admin profile", error: error.message });
    }
};

exports.updateAdminProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const admin = await User.findByIdAndUpdate(req.user._id, { name, email }, { new: true });
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: "Failed to update admin profile", error: error.message });
    }
};

// User Management
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: { $ne: 'admin' } }).select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve users", error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user", error: error.message });
    }
};

// Product Management
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve products", error: error.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, image } = req.body;
        const newProduct = new Product({ name, description, price, category, stock, image });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Failed to create product", error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const updates = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Failed to update product", error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findByIdAndDelete(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete product", error: error.message });
    }
};

