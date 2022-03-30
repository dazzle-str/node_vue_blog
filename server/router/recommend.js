const express = require('express')
const router = express.Router()
const recommendHandler = require('../router_handler/recommend.js')

router.get('/get', recommendHandler.get)

router.put('/set', recommendHandler.set)

module.exports = router