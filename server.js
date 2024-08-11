require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

// Apply CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your frontend during development
  methods: 'GET,POST,PUT,DELETE', // Specify allowed methods
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const logoRoutes = require("./routes/logoRoutes");
const homeRoutes = require("./routes/homeRoutes")

app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/about", aboutRoutes);
app.use("/logo", logoRoutes);
app.use("/home",homeRoutes)
app.get('/test-cors', (req, res) => {
  res.json({ message: 'CORS is working!' });
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});