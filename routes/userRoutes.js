const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

router.get('/getAllUsers', userController.getAllUsers);
router.post('/createUser', userController.createUser);
router.get('/getUserByEmail/:email', userController.getUserByEmail);
router.put('/updateUserByEmail/:email', userController.updateUserByEmail);
router.delete('/deleteUserByEmail/:email', userController.deleteUserByEmail);

module.exports = router;