const { sequelize } = require('../models');
const products = sequelize.models.products

async function idgenerator(){
    const currentItemId = await products.findOne({
        attributes: [
          [sequelize.fn('MAX', sequelize.col('id')), 'maxId']
        ]
      }).then(result => {
        const maxId = result.get('maxId');
       return maxId
      }).catch(error => {
        console.error('Error:', error);
      });
    // console.log(Items)
    if(!currentItemId){
        return 1
    }
    else{
        return currentItemId+1
    }
}

module.exports = idgenerator