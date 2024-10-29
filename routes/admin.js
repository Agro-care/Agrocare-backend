const express = require('express');
const { 
    getAdminProfile, 
    updateAdminProfile, 
    getAllUsers, 
    deleteUser, 
    getAllProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/admin.js');
const checkAdmin = require('../middleware/checkAdmin'); // Middleware to ensure admin access

const router = express.Router();

// Admin Profile Management
router.get('/admin/profile', checkAdmin, getAdminProfile);
router.put('/admin/profile', checkAdmin, updateAdminProfile);

// User Management (Admin Only)
router.get('/admin/users', checkAdmin, getAllUsers);
router.delete('/admin/users/:userId', checkAdmin, deleteUser);

// Product Management (Admin Only)
router.get('/admin/products', checkAdmin, getAllProducts);
router.post('/admin/products', checkAdmin, createProduct);
router.put('/admin/products/:productId', checkAdmin, updateProduct);
router.delete('/admin/products/:productId', checkAdmin, deleteProduct);

module.exports = router;
