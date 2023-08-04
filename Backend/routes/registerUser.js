const registerUser = require('../controllers/registerUser')
const express = require('express')
const router = express.Router()
router.post('/',registerUser)
module.exports = router