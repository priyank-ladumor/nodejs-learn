const fs = require('fs')

// const productdata = JSON.parse(fs.readFileSync('product.json', 'utf-8'));
// const dataproduct = productdata.products

const model = require('../model/product')
const crud = model.crud

exports.getProducts = async (req, res) => {  // :id is called url parameter
    const getproducts = await crud.find();
    res.status(200).json(getproducts)
    // res.status(200).json(dataproduct)
}
exports.getSingleProduct = async (req, res) => {

    try {
        const getsingleproducts = await crud.findById({ _id: req.params.id });
        res.status(200).json(getsingleproducts)
    } catch (err) {
        res.status(400).json({ "msg": err });
    }
    // const prod = dataproduct.find(p => p.id === +req.params.id);
    // res.status(200).json(prod)
}
exports.createProduct = async (req, res) => {
    try {
        const createproduct = new crud(req.body)
        res.status(201).json({ "msg": "Product added successfully." });
    } catch (err) {
        res.status(400).json({ "msg": err });
    }

    // dataproduct.push(req.body)
    // res.status(201).json(crudproduct)
}

exports.updateProductPUT = async (req, res) => {
    try {
        const updateproducts = await crud.findOneAndReplace({ _id: req.params.id }, req.body, { new: true });
        res.status(200).json({ "msg": "Product updated successfully." });
    } catch (err) {
        res.status(400).json({ "msg": err });
    }
    // const id = +req.params.id
    // const prodIndex = dataproduct.findIndex(p => p.id === id);
    // dataproduct.splice(prodIndex, 1, { ...req.body, id: id })
    // res.status(201).json(dataproduct)
}
exports.updateProductPATCH = async (req, res) => {
    try {
        const updateproducts = await crud.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.status(200).json({ "msg": "Product updated successfully." });
    } catch (err) {
        res.status(400).json({ "msg": err });
    }
    // const id = +req.params.id
    // const prodIndex = dataproduct.findIndex(p => p.id === id);
    // const prodpatch = dataproduct[prodIndex]
    // dataproduct.splice(prodIndex, 1, { ...prodpatch, ...req.body })
    // res.status(201).json(dataproduct)
}
exports.deleteProduct = async (req, res) => {
    try {
        const deleteproducts = await crud.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({ "msg": "Product deleted successfully." });
    } catch (err) {
        res.status(400).json({ "msg": err });
    }
    // const id = +req.params.id
    // const prodIndex = dataproduct.findIndex(p => p.id === id);
    // console.log(prodIndex);
    // dataproduct.splice(prodIndex, 1)
    // res.status(200).json(dataproduct)
}

// export { deleteProduct, updateProductPATCH, updateProductPUT, createProduct, getSingleProduct, getProducts }
//require type module