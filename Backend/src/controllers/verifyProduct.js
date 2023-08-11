const { verifyAndTransferProduct } = require('../../fabric-samples/asset-transfer-basic/application-javascript/verifyProduct');
const { sequelize } = require('../../models');
const time = require('../../utils/time');
const decodeSecretKey = require('../../utils/decodeSecretKey')
const organizations = require('../../utils/constants/organizations')
const products = sequelize.models.products;
const producthistory = sequelize.models.producthistory;

// Function to handle the "verify" operation

async function handleVerify(id, status) {
  const transfer = await producthistory.findOne({ attributes: ['history'], where: { id } });
  const exists = await products.findOne({ where: { id } });
  if (exists) {
    await products.update({ status,location:'WareHouse',transited:false }, { where: { id } });

    await producthistory.update({
      history: [
        ...transfer.dataValues.history,
        {
          time: time(),
          location: "WareHouse",
          status
        }
      ]
    }, { where: { id } });
    return { status };
  } else {
    throw new Error(`Product with this Id:${id} doesn't exist`);
  }
}

// Function to handle the "transfer" operation
async function handleTransfer(id, status) {
  const transfer = await producthistory.findOne({ attributes: ['history'], where: { id } });
  // const verifiedProduct = await products.update({transited:true},{
  //   where:{
  //     id
  //   }
  // })


  const location = (status === 'Defective')?"Factory":"Store"
  console.log("locationnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",location)
  await products.update({location,transited:false},{
    where:{
      id
    }
  })
  if (transfer) {

    await producthistory.update({
      history: [
        ...transfer.dataValues.history,
        {
          time: time(),
          from: "WareHouse",
          to: location,
          status:'Transited'
        }
      ]
    }, { where: { id } });
    return "Product History Updated";
  } else {
    throw new Error("Product Not available in the WareHouse");
  }
}

const verifyProduct = async (req, res) => {
  console.log("VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV")
  const { username, organization } = req.user;
  const { id, status, operation } = req.body;
  const secretKey = decodeSecretKey(username)

  try {
    const response = await verifyAndTransferProduct(id, operation, status, username,secretKey,organizations[organization]);

    if (!response) {
      res.status(404).json({ message: `Your request to ${operation} was unsuccessful` });
      return;
    }

    switch (operation) {
      case 'verify':
        const verifyResult = await handleVerify(id, status);
        res.status(200).json(verifyResult);
        break;

      case 'transfer':
        const transferResult = await handleTransfer(id, status);
        res.status(200).json(transferResult);
        break;

      default:
        res.staus(404).send("Invalid Operation");
    }

  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = verifyProduct;
