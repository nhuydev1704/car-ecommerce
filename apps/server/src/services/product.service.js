const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Product = require('../models/product.model');

/**
 * Create a user
 * @param {Object} categoryBody
 * @returns {Promise<User>}
 */
const createProduct = async (productBody) => {
  return Product.create(productBody);
};

const queryProducts = async (filter, options) => {
  const products = await Product.paginate(filter, {
    ...options,
    populate: 'category_id',
  });
  return products;
};

const getProductById = async (id) => {
  return Product.findById(id);
};

const updateProductId = async (productId, updateBody) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  Object.assign(product, updateBody);
  await product.save();
  return product;
};

const deleteProduct = async (productId) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  await product.remove();
};

module.exports = {
  createProduct,
  queryProducts,
  updateProductId,
  deleteProduct,
  getProductById,
};
