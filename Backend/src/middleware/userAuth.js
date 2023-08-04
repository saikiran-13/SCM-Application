const { sequelize } = require('../../models');
const bcrypt = require('bcrypt')
const userDetails = sequelize.models.userdetails;
const userAuthentication = async (req,res,next) =>{
    const {username,password,organization} = req.body;
    const userCredentials = await userDetails.findOne({where:{username}})
    const hashedPassword = userCredentials?.dataValues?.password
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        if(match){
          next()  
        }
      } 
      catch (error) {
        throw error;
      }
}
module.exports = userAuthentication