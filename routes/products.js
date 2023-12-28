const express = require('express')
const productController = require('../controller/product')

const router = express.Router()

router
    .get('/', productController.getProducts)
    .get('/:id', productController.getSingleProduct)
    .post('/', productController.createProduct)
    .put('/:id', productController.updateProductPUT)
    .patch('/:id', productController.updateProductPATCH)
    .delete('/:id', productController.deleteProduct)
    .get('/ssr/ssr', productController.getProductsSSR)

exports.router = router;