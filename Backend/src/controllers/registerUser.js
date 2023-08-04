const {registerOrgUser} = require('../../fabric-samples/asset-transfer-basic/application-javascript/utils/registeruser');
const { sequelize } = require('../../models');
const userDetails = sequelize.models.userdetails;
const crypto = require('../../utils/crypto')
const bcrypt = require('bcrypt')
require('dotenv').config()

const registerUser = async (req,res)=>{
    const {username,password} = req.body;
    const exists = await userDetails.findOne({where:{username}})
    if(exists){
        res.send("Username already exists")
        return 
    }
    
    const {secret} = await registerOrgUser(username,password)
    const encryptedSecretKey = crypto.encryptSecretKey(secret,process.env.TEST_ENCRYPTION_KEY)
    const hashedPassword = await bcrypt.hash(password,10)

    const credentials = await userDetails.create({
        username,
        password:hashedPassword,
        secretkey:encryptedSecretKey, 
        role:'user',
        organization:'Store'
    })
    res.send(secret)
 
}
module.exports = registerUser