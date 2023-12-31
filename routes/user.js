const express = require('express')
const userController = require('../controller/user')
// const Auth = require('../middleware/auth')
const router = express.Router()

router
    .get('/', userController.getUserDetails)
    .post('/signup', userController.createUser)
    .post('/signin', userController.userLogin)

exports.router = router;