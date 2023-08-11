
const {enrollOrgUser} = require('../../fabric-samples/asset-transfer-basic/application-javascript/utils/enrollclient')
const organizations = require('../../utils/constants/organizations')

const jwt = require('jsonwebtoken')

require('dotenv').config()

const enrollUser = async (req,res)=>{
    const secretKey = process.env.SECRET_KEY
    const {username,password,role,organization} = req.body;
    try{
        await enrollOrgUser(username,password,organizations[organization])
  
        const userCredentials = {
                username,
                organization,
                role
            }
            
        const JWTtoken = jwt.sign(userCredentials,secretKey,{
                expiresIn:'1d'
            })
            console.log(JWTtoken)
       res.status(200).json({JWTtoken})
    }
    catch(error){
        res.status(404).send("Error: User credentials invalid")
    }

}
module.exports = enrollUser