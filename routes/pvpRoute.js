const express = require('express');

const router = express.Router();

const trainingController = require('../controller/trainingController');
const authController = require('../controller/authController');
const sharkController = require('../controller/sharkController')
const pvpController = require('../controller/pvpController');

router.post('/', pvpController.pvp);
router.get('/:id', pvpController.getListBattles);
router.get('/', authController.protect, pvpController.getOwnListBattles);



module.exports = router;