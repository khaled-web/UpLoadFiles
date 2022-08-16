//activate express-package
const express = require('express');
//express-method
const router = express.Router();
//importing ProductController-functions
const {
 createProduct,
 getAllProduct,
 deleteProduct
} = require('../controllers/productController');
//importing uploadController-functions
const {
 uploadProductImage
} = require('../controllers/uploadsController')
//routes
router.route('/').post(createProduct).get(getAllProduct);
router.route('/uploads').post(uploadProductImage);
router.route('/:id').delete(deleteProduct);
//exportingRoutes
module.exports = router;