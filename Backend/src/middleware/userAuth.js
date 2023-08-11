const { sequelize } = require('../../models');
const bcrypt = require('bcrypt')
const userDetails = sequelize.models.userdetails;
const userAuthentication = async (req,res,next) =>{
  const { username, password, organization } = req.body;
try {
  const userCredentials = await userDetails?.findOne({ where: { username,organization } });

  if (!userCredentials) {
    throw new Error('User not found');
  }

  const hashedPassword = userCredentials.dataValues.password;
  if (!hashedPassword) {
    throw new Error('Hashed password not found');
  }

  const match = await bcrypt.compare(password, hashedPassword);
  if (!match) {
    throw new Error('Incorrect password');
  }

  next();
} catch (error) {
  console.error('Error:', error.message);
  res.status(404).json({ error: error.message });
}

  
}
module.exports = userAuthentication