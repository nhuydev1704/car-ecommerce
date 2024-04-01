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

module.exports = {
  createCategory,
};
