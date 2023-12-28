const fs = require('fs')

// const productdata = JSON.parse(fs.readFileSync('product.json', 'utf-8'));
// const dataproduct = productdata.products

const model = require('../model/product')
const { error } = require('console')
const crud = model.crud

exports.getProducts = (req, res) => {  // :id is called url parameter
    res.status(200).json(dataproduct)
}
exports.getSingleProduct = (req, res) => {
    const prod = dataproduct.find(p => p.id === +req.params.id);
    console.log(prod);
    res.status(200).json(prod)
}
exports.createProduct = async (req, res) => {
    try {
        const crudproduct = new crud(req.body)

        await crudproduct.save();
        res.status(201).json({ "msg": "Product added successfully." });
    } catch (err) {
        res.status(400).json({ "msg": err });
    }

    // dataproduct.push(req.body)
    // res.status(201).json(crudproduct)
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