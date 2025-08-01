const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const tokenController = require('../controllers/tokenController');
const catagoriesController = require('../controllers/catagoriesController');

// Define routes for user operations
router.get('/Home', userController.homePage);
router.get('/all_users', userController.getAllUsers);
router.post('/register', userController.registerUser);
router.post('/login',  userController.loginUser);
router.get('/dashboard', userController.dashboard);
router.get('/logout', userController.logoutUser);

// Define routes for token operations
router.post('/refreshToken', tokenController.refreshToken)

// Defineing CURD operations for catagories
router.post('/addCategory', tokenController.addCategory);
router.get('/getAllCategory', tokenController.getAllCategory);
router.get('/getCategoryByName/:name', tokenController.getCategoryByName);
router.put('/updateCategoryByName/:name', tokenController.updateCategoryByName);
router.delete('/deleteCategoryByName/:name', tokenController.deleteCategoryByName);

module.exports = router
