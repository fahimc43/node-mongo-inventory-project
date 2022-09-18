const {
  getProductsServices,
  createProductServices,
} = require("../services/product.services");

exports.getProducts = async (req, res, next) => {
  try {
    const result = await getProductsServices();

    res.status(200).json({
      status: "Success",
      length: result.length,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: " Can't get the data ",
      error: error.message,
    });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const result = await createProductServices(req.body);

    if (result.quantity === 0) {
      result.status = "out-of-stock";
    }

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
};
