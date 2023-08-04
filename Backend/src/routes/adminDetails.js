const adminDetails = require('../controllers/adminDetails')
const express = require('express')
const router = express.Router()
router.post('/',adminDetails)
module.exports = router