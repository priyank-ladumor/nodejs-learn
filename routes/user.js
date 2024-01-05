const express = require('express')
const userController = require('../controller/user')
const Auth = require('../middleware/auth')
const router = express.Router()
const file = require('../middleware/multer')
const upload = file.upload

router
    .get('/', userController.getUserDetails)
    .post('/signup', userController.createUser)
    .post('/signin', userController.userLogin)
    .patch('/update', Auth, upload.array('images'), userController.updateUserDetails)
    .post('/forgotpassword', userController.userForgotPassword)
    .post('/reset-password/:id/:token', userController.userResetPassword)

exports.router = router;