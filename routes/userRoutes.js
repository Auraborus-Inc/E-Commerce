const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/Home', userController.homePage);
router.get('/all_users', userController.getAllUsers);
router.post('/register', userController.registerUser);
router.post('/login',  userController.loginUser);
router.get('/dashboard', userController.dashboard);
router.get('/logout', userController.logoutUser);
router.post('/refreshToken', userController.refreshToken)

module.exports = router
