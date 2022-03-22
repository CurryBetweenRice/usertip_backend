const express = require('express');

const router = express.Router();

const trainingController = require('../controller/trainingController');
const authController = require('../controller/authController');
const sharkController = require('../controller/sharkController')



router.post('/', authController.protect, sharkController.refreshSharkStamina, trainingController.upgradeShark);
/*
    Because shark stamina only used here, thats why i only put middleware to refresh shark stamina here, but if want to show or update shark stamina everytime, can just put the middleware to every route.
*/


module.exports = router;