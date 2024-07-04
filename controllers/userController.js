const { shopifyAdmin } = require('../config/shopifyConfig');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { email, firstName, lastName } = req.body;
    const query = `
    mutation {
        customerCreate(input: {
            email: "${email}",
            firstName: "${firstName}",
            lastName: "${lastName}"
        }) {
            customer {
                id
                email
            }
            userErrors {
                field
                message
            }
        }
    }`;

    try {
        const response = await shopifyAdmin.post('/graphql.json', { query: query });
        console.log("Response from Shopify:", response.data);

        if (response.data.errors) {
            res.status(400).json({ error: response.data.errors[0].message });
        } else {
            const { customerCreate } = response.data.data;
            if (customerCreate.userErrors.length > 0) {
                res.status(400).json({ error: customerCreate.userErrors[0].message });
            } else {
                // Step 2: Send account invite
                const inviteQuery = `
                mutation {
                    customerInviteCreate(input: {customerId: "${customerCreate.customer.id}"}) {
                        customerInvite {
                            id
                            email
                        }
                        userErrors {
                            field
                            message
                        }
                    }
                }`;

                try {
                    const inviteResponse = await shopifyAdmin.post('/graphql.json', { query: inviteQuery });
                    console.log("Invite response from Shopify:", inviteResponse.data);

                    if (inviteResponse.data.errors) {
                        res.status(400).json({ error: inviteResponse.data.errors[0].message });
                    } else {
                        const { customerInviteCreate } = inviteResponse.data.data;
                        if (customerInviteCreate.userErrors.length > 0) {
                            res.status(400).json({ error: customerInviteCreate.userErrors[0].message });
                        } else {
                            res.json({ customer: customerCreate.customer });
                        }
                    }
                } catch (inviteError) {
                    if (inviteError.response) {
                        console.error("Shopify Admin API invite error:", inviteError.response.data);
                        res.status(500).json({ error: inviteError.response.data });
                    } else if (inviteError.request) {
                        console.error("Error making request to Shopify Admin API (invite):", inviteError.request);
                        res.status(500).json({ error: 'Error making request to Shopify Admin API (invite)' });
                    } else {
                        console.error("Unexpected error (invite):", inviteError.message);
                        res.status(500).json({ error: inviteError.message });
                    }
                }
            }
        }
    } catch (error) {
        if (error.response) {
            console.error("Shopify Admin API error:", error.response.data);
            res.status(500).json({ error: error.response.data });
        } else if (error.request) {
            console.error("Error making request to Shopify Admin API:", error.request);
            res.status(500).json({ error: 'Error making request to Shopify Admin API' });
        } else {
            console.error("Unexpected error:", error.message);
            res.status(500).json({ error: error.message });
        }
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    const query = `
    mutation {
        customerAccessTokenCreate(input: {email: "${email}", password: "${password}"}) {
            customerAccessToken {
                accessToken
                expiresAt
            }
            customerUserErrors {
                code
                field
                message
            }
        }
    }`;

    try {
        const response = await shopifyAdmin.post('/graphql.json', { query: query });
        console.log("Response from Shopify:", response.data);

        if (response.data.errors) {
            res.status(400).json({ error: response.data.errors[0].message });
        } else {
            const { customerAccessTokenCreate } = response.data.data;
            if (customerAccessTokenCreate.customerUserErrors.length > 0) {
                res.status(400).json({ error: customerAccessTokenCreate.customerUserErrors[0].message });
            } else {
                res.json({ token: customerAccessTokenCreate.customerAccessToken.accessToken });
            }
        }
    } catch (error) {
        if (error.response) {
            console.error("Shopify Admin API error:", error.response.data);
            res.status(500).json({ error: error.response.data });
        } else if (error.request) {
            console.error("Error making request to Shopify Admin API:", error.request);
            res.status(500).json({ error: 'Error making request to Shopify Admin API' });
        } else {
            console.error("Unexpected error:", error.message);
            res.status(500).json({ error: error.message });
        }
    }
};
