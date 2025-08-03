const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

// Define routes for user operations
router.get('/Home', authController.homePage);
router.get('/all_users', authController.getAllUsers);
router.post('/register', authController.registerUser);
router.post('/login',  authController.loginUser);
router.get('/dashboard', authController.dashboard);
router.get('/logout', authController.logoutUser);

module.exports = router

