// import { deleteProduct, updateProductPATCH, updateProductPUT, createProduct, getSingleProduct, getProducts } from "./controller/product"  //es6

require('dotenv').config()

const fs = require('fs')
const morgan = require('morgan')
const mongoose = require('mongoose');
const express = require('express')
const cors = require('cors')
var jwt = require('jsonwebtoken');
const server = express();

// db connections
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.DB_URL)
  console.log("db connected");
}


// const productController = require('./controller/product')
const productRouter = require('./routes/products')
const userRouter = require('./routes/user')

const indexhtml = fs.readFileSync('index.html', 'utf-8');

//Auth
const Auth = require('./middleware/auth')

server.use(cors());
//body parser //application middle
server.use(express.json())
//morgan middleware (yhird party middleware)
server.use(morgan('default'))



//static hosting
server.use(express.static(process.env.PUBLIC_DIR))
// server.use(express.static('public'))

server.use('/product', productRouter.router)
// server.use('/product', Auth, productRouter.router)

server.use('/user', userRouter.router)


server.listen(+process.env.PORT, () => {
  console.log("Server is running on http://localhost:8080");
})
















//formdata body parser
// server.use(express.urlencoded())


//middleware used to stop req in any position where it is start or end orrrr req modified / req auth
// server.use((req, res, next) => {
//     console.log(req.get('User-Agent'), new Date(), req.ip, req.method, req.hostname);
//     next()
// })

//route middleware
// const auth = (req, res, next) => {
//     // if (req.query.password) {
//     // if (req.body.password) {
//     if (req.params) {
//         next()
//     } else {
//         if (!req.headers['authorization']) return res.status(401).send({
//             message: "You must be logged in to access this resource"
//         });
//     }
// }

// server.use(auth)


//API - ENDPOINT - ROUTE
//REST/CRUD APIS

// server
//     .get('/product', productController.getProducts)
//     .get('/product/:id', productController.getSingleProduct)
//     .post('/product', auth, productController.createProduct)
//     .put('/product/:id', auth, productController.updateProductPUT)       //override
//     .patch('/product/:id', auth, productController.updateProductPATCH)     //not override
//     .delete('/product/:id', auth, productController.deleteProduct)



// server.get('/', (req, res) => {
//     res.status(201).json(dataproduct)
//     // res.send('hello')
// })

// server.get('/api', (req, res) => {
//     res.send("piyu")
//     res.sendFile("D:/Desktop/SCT/nodejs/index.html")
// })

// server.get('/status', (req, res) => {
//     res.sendStatus(404)
// })


