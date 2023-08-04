const enrollUser = require('../controllers/login')
const express = require('express')
const router = express.Router()
router.post('/',enrollUser)
module.exports = router