require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  'http://localhost:3001', // Development URL
  'https://your-production-frontend-domain.com' // Replace with your production frontend domain
];


app.use(bodyParser.json());

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const logoRoutes = require("./routes/logoRoutes");
const homeRoutes = require("./routes/homeRoutes")
const orderRoutes = require("./routes/orderRoutes")

app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/about", aboutRoutes);
app.use("/logo", logoRoutes);
app.use("/home", homeRoutes);
app.use("/order", orderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
