var jwt = require('jsonwebtoken');
const model = require('../model/user')
const user = model.user
const express = require('express')
const server = express();

const Auth = (async (req, res, next) => {
    try {
        // const public_key = fs.readFileSync(path.resolve(__dirname, './public.key'), 'utf-8')
        // var decoded = jwt.verify(req.headers.authorization, public_key);
        var decoded = jwt.verify(req.headers.authorization, process.env.PRIVATE_KEY);

        const finduser = await user.findOne({ email: decoded.email })
        console.log(decoded);
        if (decoded.email === finduser.email) {
            req.finduser = finduser;
            next()
        } else {
            res.sendStatus(401)
        }
    } catch (err) {
        res.sendStatus(401)
    }
})

module.exports = Auth