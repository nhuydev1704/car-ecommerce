const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services');
const { uploadToCloudinary } = require('../utils/cloudinary');

const createCategory = catchAsync(async (req, res) => {
  const { name } = req.body;
  const result = await uploadToCloudinary(req.file);

  const category = await categoryService.createCategory({ name, logo: result.secure_url });
  res.status(httpStatus.CREATED).send(category);
});

const getCategories = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await categoryService.queryCategories(
    {
      name: { $regex: filter.name || '' },
    },
    options
  );
  res.send(result);
});

// const getUser = catchAsync(async (req, res) => {
//   const user = await userService.getUserById(req.params.userId);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//   }
//   res.send(user);
// });

const updateCategory = catchAsync(async (req, res) => {
  let result;
  if (req.file) {
    result = await uploadToCloudinary(req.file);
  }

  const category = await categoryService.updateCategoryById(req.params.categoryId, {
    name: req.body.name,
    logo: result ? result.secure_url : req.body.icon,
  });

  res.send(category);
});

const deleteCategory = catchAsync(async (req, res) => {
  await categoryService.deleteCategory(req.params.categoryId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCategory,
  getCategories,
  // getUser,
  updateCategory,
  deleteCategory,
};
