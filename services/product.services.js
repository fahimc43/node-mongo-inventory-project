const Product = require("../models/Product");
const mockData = require("../data/mock_data.json");

exports.getProductsServices = async () => {
  const products = await Product.find({});
  return products;
};

exports.createProductServices = async (data) => {
  const product = await Product.create(data);
  return product;
};

exports.updateProductByIdService = async (productId, data) => {
  // const result = await Product.updateOne(
  //   { _id: productId },
  //   { $set: data },
  //   { runValidators: true }
  // );

  const product = await Product.findById(productId);
  const result = await product.set(data).save();
  return result;
};

exports.bulkUpdateProductsService = async (data) => {
  // const result = await Product.updateMany({ _id: data.ids }, data.data, {
  //   runValidators: true,
  // });

  const products = [];
  data.ids.forEach((product) =>
    products.push(Product.updateOne({ _id: product.id }, product.data))
  );
  const result = await Promise.all(products);
  return result;
};

exports.deleteProductByIdService = async (data) => {
  const result = Product.deleteOne({ _id: data });
  return result;
};

exports.bulkDeleteProductsService = async (data) => {
  const result = Product.deleteMany({});
  return result;
};
