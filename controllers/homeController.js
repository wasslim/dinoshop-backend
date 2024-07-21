// dino-webshop-backend/controllers/aboutController.js
const { shopifyStorefront, shopifyAdmin } = require('../config/shopifyConfig');

exports.getHomeInfo = async (req, res) => {
    const query = `
    {
        files(first: 15) {
            edges {
                node {
                    ... on MediaImage {
                        image {
                            originalSrc
                        }
                    }
                }
            }
        }
    }`;

    try {
        const response = await shopifyAdmin.post('/graphql.json', { query });
        const files = response.data.data.files.edges;
        const heroImages = files
            .filter(edge => edge.node.image && (
                edge.node.image.originalSrc.includes('banner_hero') ||
                edge.node.image.originalSrc.includes('groepsfoto') ||
                edge.node.image.originalSrc.includes('foto_bankje')
            ))
            .map(edge => edge.node.image.originalSrc);

        if (heroImages.length) {
            res.json({ hero_images: heroImages });
        } else {
            res.status(404).json({ error: 'Images not found' });
        }
    } catch (error) {
        if (error.response) {
            console.error("Shopify Storefront API error:", error.response.data);
            res.status(500).json({ error: error.response.data });
        } else if (error.request) {
            console.error("Error making request to Shopify Storefront API:", error.request);
            res.status(500).json({ error: 'Error making request to Shopify Storefront API' });
        } else {
            console.error("Unexpected error:", error.message);
            res.status(500).json({ error: error.message });
        }
    }
};