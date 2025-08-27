const express = require('express');
const router = express.Router();

const productsContoller = require('../controllers/productsController');

// -------------------- Products CRUD --------------------
router.post('/addProduct', productsContoller.addProduct);
router.get('/getAllProducts', productsContoller.getAllProducts);

router.get('/getProductById/:id', productsContoller.getProductById);
router.get('/getProductByName/:name', productsContoller.getProductByName);
router.get('/getProductByCategory/:category', productsContoller.getProductByCategory);

router.put('/updateProductById/:id', productsContoller.updateProductById);
router.put('/updateProductByName/:name', productsContoller.updateProductByName);

router.delete('/deleteProductById/:id', productsContoller.deleteProductById);
router.delete('/deleteProductByName/:name', productsContoller.deleteProductByName);

module.exports = router;