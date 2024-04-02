const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const categoryController = require('../../controllers/category.controller');
const { categoryValidation } = require('../../validations');

const router = express.Router();

router
  .route('/')
  .post(auth('getCategories'), categoryController.createCategory)
  .get(auth('getCategories'), validate(categoryValidation.getCategories), categoryController.getCategories);

// router
//   .route('/:userId')
//   .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
//   .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
//   .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
