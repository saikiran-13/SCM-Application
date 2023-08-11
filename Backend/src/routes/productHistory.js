const productHistory = require('../controllers/productHistory')
const express = require('express')
const router = express.Router()
router.get('/:id',productHistory)
module.exports = router