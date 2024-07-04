// dino-webshop-backend/controllers/aboutController.js
const { shopifyStorefront, shopifyAdmin } = require('../config/shopifyConfig');

exports.getAboutInfo = async (req, res) => {
    const query = `
    {
        files(first: 5) {
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
        const stijnImage = files.find(edge => edge.node.image && edge.node.image.originalSrc.includes('stijn.jpg'));

        if (stijnImage) {
            res.json({ stijn_image_url: stijnImage.node.image.originalSrc });
        } else {
            res.status(404).json({ error: 'Image not found' });
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
