const express = require('express');

const router = express.Router();

const sharkController = require('../controller/sharkController');
const authController = require('../controller/authController')

router.get('/', authController.protect,sharkController.getShark);
router.get('/:id', sharkController.getSharkById);
router.get('/top-5-sharks', sharkController.getTopFiveShark);


module.exports = router;