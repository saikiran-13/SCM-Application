const { createAndTransferProduct } = require('../../fabric-samples/asset-transfer-basic/application-javascript/createProduct');
const { sequelize } = require('../../models');
const { v4: uuidv4 } = require('uuid');
const time = require('../../utils/time');
const decodeSecretKey = require('../../utils/decodeSecretKey')
const organizations = require('../../utils/constants/organizations')
const products = sequelize.models.products;
const producthistory = sequelize.models.producthistory;
const idgenerator = require('../../utils/Idgenerator')

async function handleCreate(id, name,image, battery, camera, price) {
console.log('hhhhhhhhhhhhhhhhhh')
    const exists = await products.findOne({ where: { id } });
   
 
      const product = await products.create({
        name,
        image,
        battery,
        camera,
        price,
        location: "Factory",
        status: "Created"
      });


    await producthistory.create({

        history: [{
          time: time(),
          location: "Factory",
          status: "Created",
      
        }]
      });

      console.log("hello")
     
      return product;
   
  }




// Function to handle the "transfer" operation
async function handleTransfer(id) {
 
    const updatedProduct = await products.update({transited:true},{
      where:{
        id
      }
    })
  
    
    const transfer = await producthistory.findOne({ attributes: ['history'], where: { id } });

        await producthistory.update({
            history: [
                ...transfer.dataValues.history,
                {
                    time: time(),
                    from: "Factory",
                    to: "WareHouse",
                    status: "Transited"
                }
            ]
        }, { where: { id } });

  }



const createProduct = async (req, res) => {
  // console.log(req)
  const { username, organization } = req.user;
  let { id, name,image, battery, camera, price, operation } = req.body;
console.log(req.body)
  const secretKey = decodeSecretKey(username)
  // const id = uuidv4()
  if(!id){
    id = await idgenerator()
  }

  try {
    const response = await createAndTransferProduct(id,name,image, battery, camera, price, operation, username,secretKey, organizations[organization]);

    console.log(operation,".........")
    switch (operation) {
      case 'create':
        const createResult = await handleCreate(16, name,image, battery, camera, price);
        res.status(200).json({createResult});
        break;

      case 'transfer':
        const transferResult = await handleTransfer(id);
        res.status(200).json({transferResult});
        break;

      default:
        res.status(404).send("Invalid Operation");
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports =  createProduct ;
