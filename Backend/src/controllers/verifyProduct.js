const { verifyAndTransferProduct } = require('../../fabric-samples/asset-transfer-basic/application-javascript/verifyProduct');
const { sequelize } = require('../../models');
const time = require('../../utils/time');
const decodeSecretKey = require('../../utils/decodeSecretKey')
const organizations = require('../../utils/constants/organizations')
const products = sequelize.models.products;
const producthistory = sequelize.models.producthistory;

// Function to handle the "verify" operation
async function handleVerify(pid, status) {
  const exists = await products.findOne({ where: { pid } });
  if (exists) {
    await products.update({ status }, { where: { pid } });
    return { status };
  } else {
    throw new Error(`Product with this Id:${pid} doesn't exist`);
  }
}

// Function to handle the "transfer" operation
async function handleTransfer(pid, status) {
    
  const transfer = await producthistory.findOne({ attributes: ['history'], where: { pid } });
  if (transfer) {
    const location = (status === 'Defective')?"Factory":"Store"
    await producthistory.update({
      history: [
        ...transfer.dataValues.history,
        {
          time: time(),
          from: "WareHouse",
          to: location,
          status
        }
      ]
    }, { where: { pid } });
    return "Product History Updated";
  } else {
    throw new Error("Product Not available in the WareHouse");
  }
}

const verifyProduct = async (req, res) => {
  const { username, organization } = req.user;
  const { pid, status, operation } = req.body;
  const secretKey = decodeSecretKey(username)

  try {
    const response = await verifyAndTransferProduct(pid, operation, status, username,secretKey,organizations[organization]);

    if (!response) {
      res.status(404).json({ message: `Your request to ${operation} was unsuccessful` });
      return;
    }

    switch (operation) {
      case 'verify':
        const verifyResult = await handleVerify(pid, status);
        res.status(200).json(verifyResult);
        break;

      case 'transfer':
        const transferResult = await handleTransfer(pid, status);
        res.status(200).json(transferResult);
        break;

      default:
        res.send("Invalid Operation");
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = verifyProduct;
