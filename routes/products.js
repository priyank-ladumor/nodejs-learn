const express = require('express')
const productController = require('../controller/product')

const router = express.Router()
const Auth = require('../middleware/auth')

const file = require('../middleware/multer')
const upload = file.upload

router
    .get('/', productController.getProducts)
    .get('/user', Auth, productController.getuserProduct)
    .get('/:id', productController.getSingleProduct)
    .post('/', Auth, upload.array('images'), productController.createProduct)
    .put('/:id', Auth, productController.updateProductPUT)
    .patch('/:id', Auth, upload.array('images'), productController.updateProductPATCH)
    .delete('/:id', productController.deleteProduct)
    .get('/ssr/ssr', productController.getProductsSSR)

exports.router = router; 