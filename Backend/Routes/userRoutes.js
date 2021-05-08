const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authControllerUser');
const userController = require('./../controllers/userController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.route('/').get(authController.protect, userController.getAllUsers);
router.post('/forgotPassword', authController.forgetPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch('/updatePassword', authController.protect, authController.updatePassword);
router.patch('/updateUser', authController.protect, userController.updateUser);
router.delete('/deleteUser', authController.protect, userController.deleteUser);

module.exports = router;
