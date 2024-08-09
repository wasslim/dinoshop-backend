require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

// Use wildcard * for development or specific domains for production
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (process.env.NODE_ENV === 'development') {
      // Allow all origins in development for testing purposes
      callback(null, true);
    } else {
      // Allow only specific domains in production
      const allowedOrigins = [
        'http://localhost:3000', // Local development
        'https://your-production-frontend-domain.com' // Replace with your production frontend domain
      ];
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
};

app.use(cors(corsOptions)); // Apply CORS middleware
app.use(bodyParser.json());

// Your routes
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const logoRoutes = require("./routes/logoRoutes");
const homeRoutes = require("./routes/homeRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/about", aboutRoutes);
app.use("/logo", logoRoutes);
app.use("/home", homeRoutes);
app.use("/order", orderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
