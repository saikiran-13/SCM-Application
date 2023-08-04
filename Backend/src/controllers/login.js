
const {enrollOrgUser} = require('../../fabric-samples/asset-transfer-basic/application-javascript/utils/enrollclient')
const organizations = require('../../utils/constants/organizations')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const enrollUser = async (req,res)=>{
    const secretKey = process.env.SECRET_KEY
    const {username,password,organization} = req.body;
    await enrollOrgUser(username,password,organizations[organization])
  
    const userCredentials = {
            username,
            organization
        }
        
    const JWTtoken = jwt.sign(userCredentials,secretKey,{
            expiresIn:'1h'
        })

   res.status(200).json({JWTtoken})
}
module.exports = enrollUser