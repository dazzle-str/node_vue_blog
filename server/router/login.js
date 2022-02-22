const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const userHandler = require('../router_handler/login.js')
const { register_schema, login_schema, reset_schema } = require('../schema/login.js')

router.post('/register', expressJoi(register_schema), userHandler.register)

router.post('/login', expressJoi(login_schema), userHandler.login)

router.post('/reset', expressJoi(reset_schema), userHandler.reset)

module.exports = router