require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ['http://localhost:3000', 'https://dinobier-shop-188140.netlify.app', 'https://dinobier.be'],
  methods: 'GET,POST,PUT,DELETE', 
  credentials: true,
}));
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/products", productRoutes);
app.use("/users", userRoutes);

app.get('/test-cors', (req, res) => {
  res.json({ message: 'CORS is working!' });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});