const express = require('express');
const multer = require('multer');

const productController = require('../../controllers/product.controller');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 2 MB
  },
});

const router = express.Router();

router.route('/').post(upload.array('file', 10), productController.createProduct).get(productController.getProducts);

router
  .route('/:productId')
  .get(productController.getProduct)
  .patch(upload.array('file', 10), productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
