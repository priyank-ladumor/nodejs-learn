const fs = require('fs')
const model = require('../model/user')
const user = model.user
const path = require('path')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// const private_key = fs.readFileSync(path.resolve(__dirname, '../private.key'), 'utf-8')

exports.createUser = async (req, res) => {
    try {
        const createuser = new user(req.body)
        // var token = jwt.sign({ email: req.body.email }, private_key, { algorithm: 'RS256' });
        var token = jwt.sign({ email: req.body.email }, process.env.PRIVATE_KEY);
        const hash = bcrypt.hashSync(req.body.password, 10);
        createuser.token = token;
        createuser.password = hash;

        await createuser.save()
        res.status(201).json({ "msg": "User created successfully.", token: token });
    } catch (err) {
        res.status(400).json({ "msg": err });
    }
}

exports.userLogin = async (req, res) => {
    try {
        const finduser = await user.findOne({ email: req.body.email });
        if (!finduser) {
            return res.status(400).send({ "msg": "Email does not exist." })
        }
        const isAuth = bcrypt.compareSync(req.body.password, finduser.password);

        if (isAuth) {
            var token = jwt.sign({ email: req.body.email }, process.env.PRIVATE_KEY);
            finduser.token = token;
            finduser.save()
            res.status(201).json({ "msg": "User login successfully.", token: token });

        } else {
            return res.status(400).send({ "msg": "password does not match." })
        }

    } catch (err) {
        res.status(401).json({ "msg": err });
    }
}

exports.getUserDetails = async (req, res) => {
    try {
        var decoded = jwt.verify(req.headers.authorization, process.env.PRIVATE_KEY);
        var finduser = await user.findOne({ email: decoded.email })
        if (req.headers.authorization === finduser.token) {
            console.log(finduser);
            const item = {
                firstname: finduser.firstname,
                lastname: finduser.lastname,
                email: finduser.email,
            }
            res.status(201).json(item);
        } else {
            res.status(401).json({ "msg": err });
        }
    } catch (err) {
        res.status(401).json({ "msg": err });
    }
}
