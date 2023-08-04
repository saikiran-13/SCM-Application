const sellProduct = require('../controllers/sellProduct')
const express = require('express')
const router = express.Router()
router.post('/',sellProduct)
module.exports = router