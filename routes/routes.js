const express = require('express')

const productRouter = express.Router()
server.use('/api', productRouter)

productRouter
    .get('/product', productController.getProducts)
    .get('/product/:id', productController.getSingleProduct)
    .post('/product', auth, productController.createProduct)
    .put('/product/:id', auth, productController.updateProductPUT)    
    .patch('/product/:id', auth, productController.updateProductPATCH)     
    .delete('/product/:id', auth, productController.deleteProduct)