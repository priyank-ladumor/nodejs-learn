
const http = require('http')
const fs = require('fs')


const indexhtml = fs.readFileSync('index.html', 'utf-8');
const productdata = JSON.parse(fs.readFileSync('product.json', 'utf-8'));
const dataproduct = productdata.products

const data = { hiii: 5 };

const server = http.createServer((req, res) => {
    // const prd = dataproduct[0].find(p => p.id === 1)
    // console.log(prd);

    // if (req.url.startsWith("/properties")) {
    //     console.log(req.url.split('/'), "req url");
    // }

    switch (req, res) {
        case '/':
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(data))
            break;

        case '/api':
            res.setHeader('Content-Type', 'text/html')
            res.end(indexhtml)
            break;

        case '/products':
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(productdata))
            break;

        default:
            res.writeHead(404, "page not found")
            res.end()
    }

    // res.setHeader('Content-Type', 'text/html')
    // res.end(indexhtml)
    // res.setHeader('Content-Type', 'application/json')
    // res.end(JSON.stringify(data))

})

server.listen(8080);