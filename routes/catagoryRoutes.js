const express = require('express');
const router = express.Router();

const catagoriesController = require('../controllers/catagoriesController');

// Defineing CURD operations for catagories
router.post('/createCategory', catagoriesController.createCategory);
router.get('/getAllCategories', catagoriesController.getAllCategories);
router.get('/getCategoryByName/:name', catagoriesController.getCategoryByName);
router.put('/updateCategoryByName/:name', catagoriesController.updateCategoryByName);
router.delete('/deleteCategoryByName/:name', catagoriesController.deleteCategoryByName);

module.exports = router
