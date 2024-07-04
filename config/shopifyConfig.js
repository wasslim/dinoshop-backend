const axios = require('axios');
require('dotenv').config();

const shopifyAdmin = axios.create({
    baseURL: `https://${process.env.SHOP_NAME}.myshopify.com/admin/api/2021-01`,
    headers: {
        'X-Shopify-Access-Token': process.env.ADMIN_API_PASSWORD,
        'Content-Type': 'application/json',
    }
});

const shopifyStorefront = axios.create({
    baseURL: `https://${process.env.SHOP_NAME}.myshopify.com/api/2021-01`,
    headers: {
        'X-Shopify-Storefront-Access-Token': process.env.STOREFRONT_ACCESS_TOKEN,
        'Content-Type': 'application/json',
    },
    httpsAgent: new (require('https').Agent)({
        rejectUnauthorized: true,
        secureProtocol: 'TLSv1_2_method', // Enforce TLS v1.2
    })
});

module.exports = { shopifyAdmin, shopifyStorefront };
