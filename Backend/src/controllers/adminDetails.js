const { sequelize } = require('../../models');
const userDetails = sequelize.models.userdetails;
const crypto = require('../../utils/crypto')
const organizations = require('../../utils/constants/organizations')
const bcrypt = require('bcrypt')
require('dotenv').config()

const adminDetails = async (req,res)=>{
    const {username,password,organization} = req.body;

    const hashedPassword = await bcrypt.hash(password,10)
    const encryptedSecretKey = crypto.encryptSecretKey(password,process.env.TEST_ENCRYPTION_KEY)

    const credentials = await userDetails.create({
        username,
        password:hashedPassword,
        secretkey:encryptedSecretKey, 
        role:'admin',
        organization
    })
    res.send("Successfully added admin details in the database")
 
}
module.exports = adminDetails