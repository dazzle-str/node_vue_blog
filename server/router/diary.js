const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const diaryHandler = require('../router_handler/diary.js')
const { add_diary_schema, list_diary_schema, delete_diary_schema } = require('../schema/diary.js')

router.post('/add', expressJoi(add_diary_schema), diaryHandler.add)

router.get('/list', expressJoi(list_diary_schema), diaryHandler.list)

router.delete('/delete/:did', expressJoi(delete_diary_schema), diaryHandler.delete)

module.exports = router