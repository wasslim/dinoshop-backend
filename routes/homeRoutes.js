// dino-webshop-backend/routes/aboutRoutes.js
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/fetch_images', homeController.getHomeInfo);

module.exports = router;
