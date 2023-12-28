// import { deleteProduct, updateProductPATCH, updateProductPUT, createProduct, getSingleProduct, getProducts } from "./controller/product"  //es6

require('dotenv').config()

const fs = require('fs')
const morgan = require('morgan')
const mongoose = require('mongoose');


// db connections
main().catch(err => console.log(err));
async function main() {
  // await mongoose.connect('mongodb://priyank_ladumor:piyu1253@ac-voyds0w-shard-00-00.wgtmwy4.mongodb.net:27017,ac-voyds0w-shard-00-01.wgtmwy4.mongodb.net:27017,ac-voyds0w-shard-00-02.wgtmwy4.mongodb.net:27017/?replicaSet=atlas-nwbxgh-shard-0&ssl=true&authSource=admin ');
  await mongoose.connect('mongodb+srv://priyank_ladumor:piyu1253@cluster0.wgtmwy4.mongodb.net/crud_product')
  console.log("db connected");
}


// const productController = require('./controller/product')
const productRouter = require('./routes/products')

const indexhtml = fs.readFileSync('index.html', 'utf-8');

const express = require('express')
const server = express();

//body parser //application middle
server.use(express.json())
//morgan middleware (yhird party middleware)
server.use(morgan('default'))



//static hosting
server.use(express.static(process.env.PUBLIC_DIR))
// server.use(express.static('public'))

server.use('/product', productRouter.router)


server.listen(8080, () => {
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


