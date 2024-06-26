const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Category = require('../models/category.model');

/**
 * Create a user
 * @param {Object} categoryBody
 * @returns {Promise<User>}
 */
const createCategory = async (categoryBody) => {
  const category = await Category.findOne({
    // name: categoryBody.name,
    name: { $regex: new RegExp('^' + categoryBody.name + '$', 'i') },
  });
  if (category) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Hãng xe đã tồn tại!');
  }

  return Category.create(categoryBody);
};

const queryCategories = async (filter, options) => {
  const categories = await Category.paginate(filter, options);
  return categories;
};

const getCategoryById = async (id) => {
  return Category.findById(id);
};

const updateCategoryById = async (categoryId, updateBody) => {
  const category = await getCategoryById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  const categoryCheck = await Category.findOne({
    // name: categoryBody.name,
    name: { $regex: new RegExp('^' + updateBody.name + '$', 'i') },
  });
  if (categoryCheck) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Hãng xe đã tồn tại!');
  }

  Object.assign(category, updateBody);
  await category.save();
  return category;
};

const deleteCategory = async (categoryId) => {
  const category = await getCategoryById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  await category.remove();
};

module.exports = {
  createCategory,
  queryCategories,
  updateCategoryById,
  deleteCategory,
};
