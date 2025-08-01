const express = require('express');
const router = express.Router();

const tokenController = require('../controllers/tokenController');

// Define routes for token operations
router.post('/refreshToken', tokenController.refreshToken)

module.exports = router;