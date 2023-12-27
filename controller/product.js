const fs = require('fs')

const productdata = JSON.parse(fs.readFileSync('product.json', 'utf-8'));
const dataproduct = productdata.products

exports.getProducts = (req, res) => {  // :id is called url parameter
    res.status(200).json(dataproduct)
}
exports.getSingleProduct = (req, res) => {
    const prod = dataproduct.find(p => p.id === +req.params.id);
    console.log(prod);
    res.status(200).json(prod)
}
exports.createProduct = (req, res) => {
    dataproduct.push(req.body)
    res.status(201).json(req.body)
}
exports.updateProductPUT = (req, res) => {
    const id = +req.params.id
    const prodIndex = dataproduct.findIndex(p => p.id === id);
    dataproduct.splice(prodIndex, 1, { ...req.body, id: id })
    res.status(201).json(dataproduct)
}
exports.updateProductPATCH = (req, res) => {
    const id = +req.params.id
    const prodIndex = dataproduct.findIndex(p => p.id === id);
    const prodpatch = dataproduct[prodIndex]
    dataproduct.splice(prodIndex, 1, { ...prodpatch, ...req.body })
    res.status(201).json(dataproduct)
}
exports.deleteProduct = (req, res) => {
    const id = +req.params.id
    const prodIndex = dataproduct.findIndex(p => p.id === id);
    console.log(prodIndex);
    dataproduct.splice(prodIndex, 1)
    res.status(200).json(dataproduct)
}

// export { deleteProduct, updateProductPATCH, updateProductPUT, createProduct, getSingleProduct, getProducts }
//require type module