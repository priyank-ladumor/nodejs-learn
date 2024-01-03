const fs = require('fs')
const ejs = require('ejs')
const path = require('path')



// const productdata = JSON.parse(fs.readFileSync('product.json', 'utf-8'));
// const dataproduct = productdata.products

const model = require('../model/product')
const crud = model.crud
const model2 = require('../model/user')
const user = model2.user

//view 
exports.getProductsSSR = async (req, res) => {
    const getproducts = await crud.find();
    ejs.renderFile(path.resolve(__dirname, '../pages/index.ejs'), { crud: getproducts }, function (err, str) {
        // str => Rendered HTML string
        res.send(str)
    });
}



exports.getProducts = async (req, res) => {  // :id is called url parameter
    let page = req.query.page;
    let pageSize = 3;
    if (req.query.sort) {
        console.log(req.query.sort);
        const getproducts = await crud.find().sort({ [req.query.sort]: req.query.order });
        // const getproducts = await crud.find().sort({ [req.query.sort]: req.query.order }).limit(req.query.limit);
        // const getproducts = await crud.find().sort({ price: -1 }).limit(2);
        res.status(200).json(getproducts)
    } else if (req.query.page) {
        const getproducts = await crud.find().skip(pageSize * (page - 1)).limit(pageSize).exec();
        res.status(200).json(getproducts)
    } else {
        const getproducts = await crud.find().exec();
        res.status(200).json(getproducts)
    }

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
        var finduser = await user.findOne({ token: req.headers.authorization })

        if (finduser) {
            const map = req.files.flatMap((ele) => ele.filename)
            const createproduct = new crud(req.body)
            createproduct.user_id = finduser._id
            createproduct.images = map
            await createproduct.save()

            res.status(201).json({ "msg": "Product added successfully." });
        } else {
            res.status(401).json({ "msg": "401" });
        }
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
        const map = req.files.flatMap((ele) => ele.filename)

        const updateproducts = await crud.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        console.log(updateproducts, "updateproducts");
        if(map?.length > 0){
            updateproducts.images = map;
            await updateproducts.save()
        }
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
    console.log(req.params.id, "id");
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

exports.getuserProduct = async (req, res) => {
    try {
        var finduser = await user.findOne({ token: req.headers.authorization })

        if (finduser) {
            var finduserproduct = await crud.find({ user_id: finduser._id })
            res.status(200).json(finduserproduct);
        } else {
            res.status(401).json({ "msg": err });
        }

    } catch (err) {
        res.status(400).json({ "msg": err });
    }
}

// export { deleteProduct, updateProductPATCH, updateProductPUT, createProduct, getSingleProduct, getProducts }
//require type module