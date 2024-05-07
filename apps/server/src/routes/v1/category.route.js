const express = require('express');
const multer = require('multer');

const categoryController = require('../../controllers/category.controller');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB
    files: 1,
  },
});

const router = express.Router();

router.route('/').post(upload.single('icon'), categoryController.createCategory).get(categoryController.getCategories);

router
  .route('/:categoryId')
  // .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
  .patch(upload.single('icon'), categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
