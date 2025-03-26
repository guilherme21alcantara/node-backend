const express = require('express');
const { weatherDataController } = require('../controllers/weatherController');

const router = express.Router();

router.get('/data', weatherDataController);

module.exports = router;
