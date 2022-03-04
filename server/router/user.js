const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const userHandler = require('../router_handler/user.js')
const { list_user_schema, detail_user_schema, state_user_schema, role_user_schema, username_user_schema, password_user_schema } = require('../schema/user.js')

router.get('/list', expressJoi(list_user_schema), userHandler.list)

router.get('/detail', userHandler.detail)

router.put('/update/state/:uid', expressJoi(state_user_schema), userHandler.state)

router.put('/update/role/:uid', expressJoi(role_user_schema), userHandler.role)

router.put('/update/username', expressJoi(username_user_schema), userHandler.username)

router.put('/update/username/:uid', expressJoi(username_user_schema), userHandler.username)

router.put('/update/password', expressJoi(password_user_schema), userHandler.password)

module.exports = router