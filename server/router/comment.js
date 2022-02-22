const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const commentHandler = require('../router_handler/comment.js')
const { add_comment_schema, list_comment_schema, delete_comment_schema } = require('../schema/comment.js')

router.post('/add', expressJoi(add_comment_schema), commentHandler.add)

router.get('/list', expressJoi(list_comment_schema), commentHandler.list)

router.get('/delete/:cmid', expressJoi(delete_comment_schema), commentHandler.delete)

module.exports = router