const {viewProducts} = require('../../fabric-samples/asset-transfer-basic/application-javascript/viewProduct')
const decodeSecretKey = require('../../utils/decodeSecretKey')
const organizations = require('../../utils/constants/organizations')
const { sequelize } = require('../../models')
const { Op } = require('sequelize');

const products = sequelize.models.products
const userdetails = sequelize.models.userdetails

const checkProducts = async (req,res) =>{

    const {username,organization} = req.user;
  
    const secretKey = await decodeSecretKey(username)
    console.log(await viewProducts(username,secretKey,organizations[organization]))
    const response = await products.findAll({
        where: {
          location: 'Factory',
          [Op.or]: [
            { status: 'Created', transited: true },
            { status: 'Updated', transited: true }
          ]
        }
      });
    res.status(200).send(response)
}   
module.exports = checkProducts