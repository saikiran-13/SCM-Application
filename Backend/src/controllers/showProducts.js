const {viewProducts} = require('../../fabric-samples/asset-transfer-basic/application-javascript/viewProduct')
const decodeSecretKey = require('../../utils/decodeSecretKey')
const organizations = require('../../utils/constants/organizations')
const { sequelize } = require('../../models')
const { Op } = require('sequelize');

const products = sequelize.models.products
const userdetails = sequelize.models.userdetails

const showProducts = async (req,res) =>{
    console.log("Helllo")
    const {username,organization,role} = req.user;
    console.log(username,organization,role)
    let response;
    const secretKey = await decodeSecretKey(username)
    // console.log("###################################3",await viewProducts(username,secretKey,organizations[organization]))
    if(organization === 'Factory' ){
        response = await products.findAll({
   
        })
        res.status(200).send(response)
    }

    else if(organization === 'Store' && role === 'admin'){

        response = await products.findAll({
            where:{
                location:organization
            }
        })
        res.send(response)
    }
    else if(organization === 'Store' && role === 'user'){
      response = await products.findAll({
        where:{
            location:organization,
            status:'Verified'
        }
    })
    res.status(200).send(response)
    }

    else if(organization === 'WareHouse'){
        const warehouseResponse = await products.findAll({
            where: {
              location: 'WareHouse'
            }
          });
        
          const factoryResponse = await products.findAll({
            where: {
              location: 'Factory',
              status: 'Defective'
            }
          });

       
        
          const storeResponse = await products.findAll({
            where: {
              location: 'Store',
              
            }
          });

          const mergedResponse = [
            ...warehouseResponse,
            ...factoryResponse,
            ...storeResponse
          ];
  
          res.status(200).send(mergedResponse)
          
    }
    else{
        res.status(404).send("Invalid Location")
    }
    console.log(response)
 
}   
module.exports = showProducts