const { shopifyStorefront, shopifyAdmin } = require('../config/shopifyConfig');

exports.getProducts = async (req, res) => {
    const query = `
    {
        products(first: 10) {
            edges {
                node {
                    id
                    title
                    descriptionHtml
                    images(first: 1) {
                        edges {
                            node {
                                src
                            }
                        }
                    }
                    variants(first: 1) {
                        edges {
                            node {
                                price
                                id
                            }
                        }
                    }
                }
            }
        }
    }`;

    try {
        const response = await shopifyAdmin.post('/graphql.json', { query });
        const products = response.data.data.products.edges.map(edge => edge.node);
        res.json(products);
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

exports.getProductById = async (req, res) => {
    const productId = Buffer.from(req.params.id, 'base64').toString('ascii');
    const query = `
    {
        product(id: "${productId}") {
            id
            title
            descriptionHtml
            images(first: 1) {
                edges {
                    node {
                        src
                    }
                }
            }
            variants(first: 1) {
                edges {
                    node {
                        price
                        id
                    }
                }
            }
        }
    }`;

    try {
        const response = await shopifyAdmin.post('/graphql.json', { query });
        console.log(response.data); // Log the response to check its structure
        const product = response.data.data.product;
        res.json(product);
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

