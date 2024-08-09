require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-domain.com'], // Add your frontend domains here
  credentials: true,
}));
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
app.use("/home",homeRoutes)
app.use("/order",orderRoutes)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
