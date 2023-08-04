const crypto = require('../utils/crypto')
const { sequelize } = require('../models');
const userdetails = sequelize.models.userdetails
require('dotenv').config()
async function decodeSecretKey(username){

    const userInfo = await userdetails.findOne({where:{username}})
    const encryptedSecretKey = userInfo.dataValues.secretkey
    const TEST_ENCRYPTION_KEY = process.env.TEST_ENCRYPTION_KEY
    const decryptedSecretKey = crypto.decryptSecretKey(encryptedSecretKey,TEST_ENCRYPTION_KEY)

    return decryptedSecretKey
}
module.exports = decodeSecretKey