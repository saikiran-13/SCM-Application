const showProducts = require('../controllers/showProducts')
const express = require('express')
const router = express.Router()
router.get('/',showProducts)
module.exports = router