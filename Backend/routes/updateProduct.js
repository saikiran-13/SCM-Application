const updateProduct = require('../controllers/updateProduct')
const express = require('express')
const router = express.Router()
router.post('/',updateProduct)
module.exports = router