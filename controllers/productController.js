//importingProductSchema
const Product = require('../models/Product');
//activate"http-status-codes"package
const {
 StatusCodes
} = require('http-status-codes');
const {
 NotFoundError
} = require('../errors');

//createProduct-function
const createProduct = async (req, res) => {
 const product = await Product.create(req.body);
 res.status(StatusCodes.CREATED).json({
  product
 })
}

//getAllProduct-function
const getAllProduct = async (req, res) => {
 const products = await Product.find({});
 res.status(StatusCodes.OK).json({
  count: products.length,
  products
 });
}

//deleteProduct-function
const deleteProduct = async (req, res) => {
 const {
  id: productID
 } = req.params;
 const product = await Product.findOneAndDelete({
  _id: productID
 })
 if (!product) {
  throw new NotFoundError(`No product with id:${productID}`)
 }
 res.status(StatusCodes.CREATED).json({
  product
 })
}

//exportingTheFunctions
module.exports = {
 createProduct,
 getAllProduct,
 deleteProduct
}