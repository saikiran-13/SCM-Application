const { sequelize } = require('../../models')
const time = require('../../utils/time')
const decodeSecretKey = require('../../utils/decodeSecretKey')
const organizations = require('../../utils/constants/organizations')
const products = sequelize.models.products
const producthistory = sequelize.models.producthistory



// Function to handle the "transfer" operation
async function productHistory(req,res,next) {
    try {

       const {id} = req.params
      

      const history = await producthistory.findAll({
        attributes: ['history'],
        where: { id }
      });
  
      res.status(200).json( history);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  





module.exports = productHistory