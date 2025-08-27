const express = require('express');
const router = express.Router();

const productsMediaContoller = require('../controllers/productMediaController');

// -------------------- Product Media (Images) --------------------
router.post("/upload", productsMediaContoller.uploadProductImage);


module.exports = router; 