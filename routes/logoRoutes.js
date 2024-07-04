// dino-webshop-backend/routes/logoRoutes.js
const express = require('express');
const router = express.Router();
const logoController = require('../controllers/logoController');

router.get('/fetch_logo', logoController.getLogo);

module.exports = router;
