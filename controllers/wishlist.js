// Add to Wishlist Controller
exports.addToWishlist = async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const isProductInWishlist = user.wishlist.includes(productId);

        if (isProductInWishlist) {
            return res.status(400).json({ message: "Product already in wishlist" });
        } else {
            user.wishlist.push(productId);
        }

        await user.save();
        res.status(200).json({ message: "Product added to wishlist", wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: "Failed to add to wishlist", error });
    }
};
