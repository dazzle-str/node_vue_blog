const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'))
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.slice(-4)
    cb(null, Date.now() + ext)
  }
})
const upload = multer({ storage })
const articleHandler = require('../router_handler/article.js')
const { add_article_schema, list_article_schema, get_article_schema, update_article_schema } = require('../schema/article.js')

router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), articleHandler.add)

router.get('/list', expressJoi(list_article_schema), articleHandler.list)

router.delete('/delete/:aid', expressJoi(get_article_schema), articleHandler.delete)

router.get('/activate/:aid', expressJoi(get_article_schema), articleHandler.activate)

router.get('/detail/:aid', expressJoi(get_article_schema), articleHandler.detail)

router.post('/update', upload.single('cover_img'), expressJoi(update_article_schema), articleHandler.update)

module.exports = router