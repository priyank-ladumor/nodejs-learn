const express = require('express')
const productController = require('../controller/product')

const router = express.Router()
const Auth = require('../middleware/auth')

router
    .get('/', Auth, productController.getProducts)
    .get('/user', Auth, productController.getuserProduct)
    .get('/:id',Auth, productController.getSingleProduct)
    .post('/',Auth, productController.createProduct)
    .put('/:id',Auth, productController.updateProductPUT)
    .patch('/:id',Auth, productController.updateProductPATCH)
    .delete('/:id',Auth, productController.deleteProduct)
    .get('/ssr/ssr', productController.getProductsSSR)

exports.router = router; 