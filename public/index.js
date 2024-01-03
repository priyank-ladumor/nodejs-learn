const fs = require('fs')

const indexhtml = fs.readFileSync('index.html', 'utf-8');
const productdata = JSON.parse(fs.readFileSync('product.json', 'utf-8'));
const dataproduct = productdata.products

const express = require('express')


const server = express();

//body parser
server.use(express.json())

//formdata body parser
// server.use(express.urlencoded())

//middleware used to stop req in any position where it is start or end
server.use((req, res, next) => {
    console.log(req.get('User-Agent'), new Date(), req.ip, req.method, req.hostname);
    next()
})

const auth = (req, res, next) => {
    // if (req.query.password) {
    if (req.body.password) {
        next()
    } else {
        if (!req.headers['authorization']) return res.status(401).send({
            message: "You must be logged in to access this resource"
        });
    }
}

// server.use(auth)

//API - ENDPOINT - ROUTE
server.post('/', auth, (req, res) => {
    res.status(201).json(dataproduct)
})

server.get('/', auth, (req, res) => {
    res.status(201).json(dataproduct)
    // res.send('hello')
})

server.get('/api', (req, res) => {
    res.sendFile("D:/Desktop/SCT/nodejs/index.html")
})

server.get('/status', (req, res) => {
    res.sendStatus(404)
})

server.listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
})






// const http = require('http')
// const fs = require('fs')


// const indexhtml = fs.readFileSync('index.html', 'utf-8');
// const productdata = JSON.parse(fs.readFileSync('product.json', 'utf-8'));
// const dataproduct = productdata.products

// const data = { hiii: 5 };

// const server = http.createServer((req, res) => {
//     // const prd = dataproduct[0].find(p => p.id === 1)
//     // console.log(prd);

//     // if (req.url.startsWith("/properties")) {
//     //     console.log(req.url.split('/'), "req url");
//     // }

//     switch (req, res) {
//         case '/':
//             res.setHeader('Content-Type', 'application/json')
//             res.end(JSON.stringify(data))
//             break;

//         case '/api':
//             res.setHeader('Content-Type', 'text/html')
//             res.end(indexhtml)
//             break;

//         case '/products':
//             res.setHeader('Content-Type', 'application/json')
//             res.end(JSON.stringify(productdata))
//             break;

//         default:
//             res.writeHead(404, "page not found")
//             res.end()
//     }

//     // res.setHeader('Content-Type', 'text/html')
//     // res.end(indexhtml)
//     // res.setHeader('Content-Type', 'application/json')
//     // res.end(JSON.stringify(data))

// })

// server.listen(8080);