const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// middleware
app.use(cors());
app.use(express.json());

// Schema design
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this product"],
      trim: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs"],
        message: "unit value can't be {VALUE}, must be kg/litre/pcs",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "quantity cant be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: "Quantity must be an integer",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status can't be {VALUE}",
      },
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Supplier",
    // },
    // categories: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

// mongoose middleware for saving data: pre / post
productSchema.pre("save", function (next) {
  //this ->
  console.log(" Before saving data");
  if (this.quantity == 0) {
    this.status = "out-of-stock";
  }

  next();
});

// productSchema.post("save", function (doc, next) {
//   console.log("After saving data");

//   next();
// });

productSchema.methods.logger = function () {
  console.log(` Data saved for ${this.name}`);
};

// Schema => Model => query

const Product = mongoose.model("Product", productSchema);

app.get("/", (req, res) => {
  res.send("Route is working");
});

// posting to database
app.post("/api/v1/product", async (req, res, next) => {
  try {
    // Save method - Instance creation => do something => save()

    const product = new Product(req.body);

    if (product.quantity === 0) {
      product.status = "out-of-stock";
    }
    const result = await product.save();

    // Create method
    // const result = await Product.create(req.body);

    res.status(200).json({
      status: "Success",
      message: "Data inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: " Data is not inserted ",
      error: error.message,
    });
  }
});

// Get data to server

app.get("/api/v1/products", async (req, res, next) => {
  try {
    const result = await Product.find({});

    res.status(200).json({
      status: "Success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: " Can't get the data ",
      error: error.message,
    });
  }
});

module.exports = app;
