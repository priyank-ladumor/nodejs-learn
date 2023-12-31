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
        // var finduser = await user.findOne({ token: req.headers.authorization })
        console.log(req.finduser, "req.finduser");
        if (req.finduser) {
            const map = req.files.flatMap((ele) => ele.filename)
            let imgApi = []
            for (let i = 0; i < map.length; i++) {
                imgApi.push(`http://localhost:8080/images/${map[i]}`)
            }
            const createproduct = new crud(req.body)
            createproduct.user_id = req.finduser._id
            createproduct.images = imgApi
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
        let imgApi = []
        for (let i = 0; i < map.length; i++) {
            imgApi.push(`http://localhost:8080/images/${map[i]}`)
        }

        const updateproducts = await crud.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        console.log(updateproducts, "updateproducts");
        if (map?.length > 0) {
            updateproducts.images = imgApi;
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
        // var finduser = await user.findOne({ token: req.headers.authorization })

        if (req.finduser) {
            var finduserproduct = await crud.find({ user_id: req.finduser._id })
            res.status(200).json(finduserproduct);
        } else {
            res.status(401).json({ "msg": err });
        }

    } catch (err) {
        res.status(400).json({ "msg": err });
    }
}

exports.productWatchlatter = async (req, res) => {
    try {
        const { _id, watchlater } = req.finduser
        const id = _id.toString();
        const pid = req.body.pid
        if (id && pid) {
            let product = await crud.findById({ _id: pid });
            if (product) {

                if (watchlater.includes(pid)) {
                    let user = await model2.user.findByIdAndUpdate(_id, { $pull: { watchlater: pid } }, { new: true })
                    res.send({ msg: "successfully removed from watchlater" })
                } else {
                    let user = await model2.user.findByIdAndUpdate(_id, { $push: { watchlater: pid } }, { new: true })
                    res.send({ msg: "successfully added to watchlater" })
                }
            }
        } else {
            return res.status(401)
        }
    } catch (err) {
        res.status(400).json({ "msg": err });
    }
}

exports.getProductWatchlatter = async (req, res) => {
    try {
        const { _id, watchlater } = req.finduser
        if (_id) {
            const populate = await model2.user.findOne(_id).populate({ path: "watchlater", model: "crud" })
            res.send(populate.watchlater)
        } else {
            return res.status(401)
        }
    } catch (err) {
        res.status(400).json({ "msg": err });
    }
}

// export { deleteProduct, updateProductPATCH, updateProductPUT, createProduct, getSingleProduct, getProducts }
//require type module