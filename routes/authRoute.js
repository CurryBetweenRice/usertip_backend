const express = require('express');

const router = express.Router();

const authController = require('../controller/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.delete('/:id',authController.protect, authController.deleteUser);

router.get('/me')


module.exports = router;