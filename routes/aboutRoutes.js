// dino-webshop-backend/routes/aboutRoutes.js
const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');

router.get('/fetch_about', aboutController.getAboutInfo);

module.exports = router;
