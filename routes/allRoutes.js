var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');

router.get('/home', userController.home);
router.get('/all_users', userController.getAllUsers);
router.get('/dashboard', authController.dashboard);

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;