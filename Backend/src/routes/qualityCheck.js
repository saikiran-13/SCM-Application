const checkProducts = require('../controllers/qualityCheck')
const express = require('express')
const router = express.Router()
router.get('/',checkProducts)
module.exports = router