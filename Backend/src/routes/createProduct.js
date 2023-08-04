const createProduct = require('../controllers/createProduct')
const express = require('express')
const router = express.Router()
router.post('/',createProduct)
module.exports = router