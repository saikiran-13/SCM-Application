const { createAndTransferProduct } = require('../../fabric-samples/asset-transfer-basic/application-javascript/createProduct');
const { sequelize } = require('../../models');
const time = require('../../utils/time');
const decodeSecretKey = require('../../utils/decodeSecretKey')
const organizations = require('../../utils/constants/organizations')
const products = sequelize.models.products;
const producthistory = sequelize.models.producthistory;


// Function to handle the "create" operation
async function handleCreate(pid, name, battery, camera, price) {

    const exists = await products.findOne({ where: { pid } });
    if (!exists) {
      const product = await products.create({
        pid,
        name,
        battery,
        camera,
        price,
        location: "Factory",
        status: "Created"
      });
      console.log(product);
      return product;
    } else {
      throw new Error(`Product with this Id:${pid} already created`);
    }
  }




// Function to handle the "transfer" operation
async function handleTransfer(pid) {
    const transfer = await producthistory.findOne({ where: { pid } });
    if (!transfer) {
      const product = await producthistory.create({
        pid,
        history: [{
          time: time(),
          from: "Factory",
          to: "WareHouse",
          status: "Created"
        }]
      });
      return "Product Transferred Successfully";
    } else {
      throw new Error("Product already transferred from Factory to WareHouse");
    }
  }



const createProduct = async (req, res) => {
  const { username, organization } = req.user;
  const { pid, name, battery, camera, price, operation } = req.body;
  
  const secretKey = decodeSecretKey(username)

  try {
    const response = await createAndTransferProduct(pid, name, battery, camera, price, operation, username,secretKey, organizations[organization]);

    if (!response) {
      res.status(404).json({ message: `Your request to ${operation} was unsuccessful` });
      return;
    }

    switch (operation) {
      case 'create':
        const createResult = await handleCreate(pid, name, battery, camera, price);
        res.status(200).json({createResult});
        break;

      case 'transfer':
        const transferResult = await handleTransfer(pid);
        console.lo
        res.status(200).json({transferResult});
        break;

      default:
        res.send("Invalid Operation");
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports =  createProduct ;
