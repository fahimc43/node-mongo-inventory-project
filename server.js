const mongoose = require("mongoose");
require("dotenv").config();
const colors = require("colors");

const app = require("./app");

// Database connection
mongoose.connect(process.env.DATA_BASE).then(() => {
  console.log("Database connection successfully".rainbow.bold);
});

// Server
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});
