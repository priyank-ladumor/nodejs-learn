const fs = require('fs')
const model = require('../model/user')
const user = model.user
const path = require('path')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars')

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
            const item = {
                firstname: finduser.firstname,
                lastname: finduser.lastname,
                email: finduser.email,
                id: finduser._id,
                mobile: finduser.mobile,
                user_pic: finduser.user_pic
            }
            res.status(201).json(item);
        } else {
            res.status(401).json({ "msg": err });
        }
    } catch (err) {
        res.status(401).json({ "msg": err });
    }
}

module.exports.updateUserDetails = async (req, res) => {
    try {
        const finduser = req.finduser
        if (finduser) {
            const map = req.files.flatMap((ele) => ele.filename)
            let imgApi = []
            for (let i = 0; i < map.length; i++) {
                imgApi.push(`http://localhost:8080/images/${map[i]}`)
            }
            const userData = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                mobile: req.body.mobile,
            }
            const updateUser = await user.findOneAndUpdate({ _id: finduser._id }, userData, { new: true });
            updateUser.user_pic = imgApi;
            await updateUser.save()
            res.status(200).json({ "msg": "User details updated successfully." });
        } else {
            res.status(401);
        }
    } catch (err) {
        res.status(400).json({ "msg": err });
    }
}

module.exports.userForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        var finduser = await user.findOne({ email: email })

        if (finduser) {
            var token = jwt.sign({ email: finduser.email }, process.env.PRIVATE_KEY, { expiresIn: "2m" });

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 465,
                debug: true,
                logger: true,
                secure: true,
                secureConnection: false,
                auth: {
                    user: process.env.MY_EMAIL,
                    pass: process.env.MY_EMAIL_PASSWORD
                },
                tls: {
                    rejectUnauthorized: true
                }
            });

            const source = fs.readFileSync('.././nodejs/public/email.html', 'utf-8').toString();
            const template = handlebars.compile(source)
            const replacement = {
                link: `http://localhost:3000/user/reset-password/${finduser._id}/${token}`,
                name: finduser.firstname
            }
            const htmltosend = template(replacement)

            var mailOptions = {
                from: process.env.MY_EMAIL,
                to: finduser.email,
                subject: 'Forgot your password',
                html: htmltosend
                // text: 
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent to ' + finduser.email);
                    res.json('Email sent to ' + finduser.email)
                }
            });

        } else {
            res.send({ status: "user does not exit" })
        }

    } catch (err) {
        res.status(400).json({ "msg": err });
    }
}

module.exports.userResetPassword = async (req, res) => {
    try {
        const { id, token } = req.params;
        const { password } = req.body;
        // let isToken = JSON.parse(token)
        var decoded = jwt.verify(token, process.env.PRIVATE_KEY);

        if (decoded.email) {
            const finduser = await user.findOne({ email: decoded.email, _id: id })
            if (finduser) {
                let newPassword = password.toString();
                const pass = await bcrypt.hashSync(newPassword, 10)
                finduser.password = pass;
                await finduser.save()
                res.send({ status: "reset password successfully" })
            }
        } else {
            res.status(400)
        }

    } catch (err) {
        res.status(401).json({ "msg": err });
    }
}