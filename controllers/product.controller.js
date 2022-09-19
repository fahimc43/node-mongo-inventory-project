const {
  getProductsServices,
  createProductServices,
  updateProductByIdService,
  bulkUpdateProductsService,
  deleteProductByIdService,
  bulkDeleteProductsService,
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

exports.updateProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProductByIdService(id, req.body);

    res.status(200).json({
      status: "Success",
      message: "Data updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: " Can't update data ",
      error: error.message,
    });
  }
};

exports.bulkUpdateProducts = async (req, res, next) => {
  try {
    const result = await bulkUpdateProductsService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Bulk data updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: " Can't update bulk data ",
      error: error.message,
    });
  }
};

exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteProductByIdService(id);

    if (!result.deletedCount) {
      res.status(400).json({
        status: "Fail",
        message: "Can't  product delete",
        data: result,
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Delete a product successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: " Can't delete data ",
      error: error.message,
    });
  }
};

exports.bulkDeleteProducts = async (req, res, next) => {
  try {
    const result = await bulkDeleteProductsService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Bulk delete product successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: " Can't delete bulk data ",
      error: error.message,
    });
  }
};
