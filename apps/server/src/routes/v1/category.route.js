const express = require('express');
const multer = require('multer');

const auth = require('../../middlewares/auth');
const categoryController = require('../../controllers/category.controller');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB
    files: 1,
  },
});

const router = express.Router();

router
  .route('/')
  .post(auth('getCategories'), upload.single('icon'), categoryController.createCategory)
  .get(auth('getCategories'), categoryController.getCategories);

router
  .route('/:categoryId')
  // .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
  .patch(auth('getCategories'), upload.single('icon'), categoryController.updateCategory)
  .delete(auth('getCategories'), categoryController.deleteCategory);

module.exports = router;
