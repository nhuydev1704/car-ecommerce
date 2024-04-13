const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { uploadToCloudinary } = require('../utils/cloudinary');
const { productService } = require('../services');
const ApiError = require('../utils/ApiError');

const createProduct = catchAsync(async (req, res) => {
  const images = [];

  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < req.files.length; index++) {
    const fle = req.files[index];
    // eslint-disable-next-line no-await-in-loop
    const result = await uploadToCloudinary(fle);
    images.push(result.secure_url);
  }

  const product = await productService.createProduct({ ...req.body, images: images.join(',') });
  res.status(httpStatus.CREATED).send(product);
});

const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'category_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productService.queryProducts(
    {
      name: { $regex: filter.name || '' },
      ...filter,
    },
    options
  );
  res.send(result);
});

const getProduct = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.send(product);
});

const updateProduct = catchAsync(async (req, res) => {
  const images = req.body.old_image.split(',');

  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < req.files.length; index++) {
    const fle = req.files[index];
    // eslint-disable-next-line no-await-in-loop
    const result = await uploadToCloudinary(fle);
    images.push(result.secure_url);
  }
  const product = await productService.updateProductId(req.params.productId, {
    ...req.body,
    images: images.join(','),
  });

  res.send(product);
});

const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProduct(req.params.productId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProduct,
  getProducts,
  // getUser,
  updateProduct,
  deleteProduct,
  getProduct,
};
