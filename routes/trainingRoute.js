const express = require('express');

const router = express.Router();

const trainingController = require('../controller/trainingController');
const authController = require('../controller/authController');
const sharkController = require('../controller/sharkController')

router.post('/', authController.protect, sharkController.refreshSharkStamina, trainingController.upgradeShark);



module.exports = router;