const verifyProduct = require('../controllers/verifyProduct')
const express = require('express')
const router = express.Router()
router.post('/',verifyProduct)
module.exports = router