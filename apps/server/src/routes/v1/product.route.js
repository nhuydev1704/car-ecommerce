const express = require('express');
const multer = require('multer');

const auth = require('../../middlewares/auth');
const productController = require('../../controllers/product.controller');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB
  },
});

const router = express.Router();

router
  .route('/')
  .post(auth('getProducts'), upload.array('file', 5), productController.createProduct)
  .get(auth('getProducts'), productController.getProducts);

router
  .route('/:productId')
  .get(auth('getProducts'), productController.getProduct)
  .patch(auth('getProducts'), upload.array('file', 5), productController.updateProduct)
  .delete(auth('getProducts'), productController.deleteProduct);

module.exports = router;
