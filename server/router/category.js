const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const categoryHandler = require('../router_handler/category.js')
const { add_category_schema, get_category_schema, update_category_schema } = require('../schema/category.js')

router.get('/list', categoryHandler.list)

router.post('/add', expressJoi(add_category_schema), categoryHandler.add)

router.delete('/delete/:cid', expressJoi(get_category_schema), categoryHandler.delete)

router.get('/activate/:cid', expressJoi(get_category_schema), categoryHandler.activate)

router.get('/detail/:cid', expressJoi(get_category_schema), categoryHandler.detail)

router.put('/update', expressJoi(update_category_schema), categoryHandler.update)

module.exports = router