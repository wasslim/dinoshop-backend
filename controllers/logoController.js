// dino-webshop-backend/controllers/logoController.js
const { shopifyAdmin } = require('../config/shopifyConfig');

exports.getLogo = async (req, res) => {
  const query = `
  {
    files(first: 10) {
      edges {
        node {
          createdAt
          updatedAt
          alt
          ... on GenericFile {
            id
            originalFileSize
            url
          }
          ... on MediaImage {
            id
            image {
              id
              originalSrc: url
              width
              height
            }
          }
        }
      }
    }
  }`;

  try {
    const response = await shopifyAdmin.post('/graphql.json', { query });
    const files = response.data.data.files.edges;
    const logoImage = files.find(edge => edge.node.image && edge.node.image.originalSrc.includes('logo_1.png'));

    if (logoImage) {
      res.json({ logo_image_url: logoImage.node.image.originalSrc });
    } else {
      res.status(404).json({ error: 'Logo not found' });
    }
  } catch (error) {
    if (error.response) {
      console.error("Shopify API error:", error.response.data);
      res.status(500).json({ error: error.response.data });
    } else if (error.request) {
      console.error("Error making request to Shopify API:", error.request);
      res.status(500).json({ error: 'Error making request to Shopify API' });
    } else {
      console.error("Unexpected error:", error.message);
      res.status(500).json({ error: error.message });
    }
  }
};
