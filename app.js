const express = require("express");
const app = express();
const cors = require("cors");

// middleware
app.use(cors());
app.use(express.json());

// Routes
const productRoute = require("./routes/product.route");

app.use("/api/v1/product", productRoute);

app.get("/", (req, res) => {
  res.send("Route is working");
});

module.exports = app;
