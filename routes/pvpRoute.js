const express = require('express');

const router = express.Router();

const trainingController = require('../controller/trainingController');
const authController = require('../controller/authController');
const sharkController = require('../controller/sharkController')
const pvpController = require('../controller/pvpController');

router.post('/', authController.protect, pvpController.pvp);
router.get('/:id', authController.protect, pvpController.getListBattles);
router.get('/', authController.protect, pvpController.getOwnListBattles);



module.exports = router;