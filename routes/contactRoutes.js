// dino-webshop-backend/routes/aboutRoutes.js
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.get('/fetch_contact', contactController.getContact);

module.exports = router;
