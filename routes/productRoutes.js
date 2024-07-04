const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/fetch_products', productController.getProducts);
router.get('/fetch_product/:id', productController.getProductById);

module.exports = router;
