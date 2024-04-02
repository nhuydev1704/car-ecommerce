const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Category = require('../models/category.model');

/**
 * Create a user
 * @param {Object} categoryBody
 * @returns {Promise<User>}
 */
const createCategory = async (categoryBody) => {
  return Category.create(categoryBody);
};

const queryCategories = async (filter, options) => {
  const categories = await Category.paginate(filter, options);
  return categories;
};

module.exports = {
  createCategory,
  queryCategories,
};
