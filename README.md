# DinoShop Backend

This is the backend for the DinoShop project, built with Node.js and Express. It interacts with the Shopify API to fetch product information, handle user authentication, and manage the shop's data.

## Project Structure
dinoshop-backend/
│
├── controllers/
│ ├── aboutController.js
│ ├── logoController.js
│ ├── productController.js
│ └── userController.js
│
├── routes/
│ ├── aboutRoutes.js
│ ├── logoRoutes.js
│ ├── productRoutes.js
│ └── userRoutes.js
│
├── config/
│ └── shopifyConfig.js
│
├── node_modules/
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js

## Setup

### Prerequisites

- Node.js installed on your machine
- Shopify API credentials

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/dinoshop-backend.git
    cd dinoshop-backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root of the project and add your Shopify API credentials:
    ```env
    SHOP_NAME=domainname.myshopify.com
    ADMIN_API_KEY=admin api key
    ADMIN_API_PASSWORD=admin api password
    STOREFRONT_ACCESS_TOKEN=storefront accescode
    ```

### Running the Server

Start the backend server with nodemon:

```sh
npx nodemon server.js
The server will be running at http://localhost:3000.

API Endpoints
Products
GET /products/fetch_products: Fetch all products
GET /products/fetch_product/:id: Fetch a specific product by ID
Users
POST /users/register: Register a new user
POST /users/login: Login a user
About
GET /about: Fetch about information
Logo
GET /logo/fetch_logo: Fetch the logo image