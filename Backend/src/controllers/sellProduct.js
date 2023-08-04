const { transferOwnership } = require('../../fabric-samples/asset-transfer-basic/application-javascript/transferOwnership');
const { sequelize } = require('../../models');
const time = require('../../utils/time');
const decodeSecretKey = require('../../utils/decodeSecretKey')
const organizations = require('../../utils/constants/organizations')
const products = sequelize.models.products;
const producthistory = sequelize.models.producthistory;
const userdetails = sequelize.models.userdetails;

const sellProduct = async (req, res) => {
  const { username,organization } = req.user;
  const { pid, name } = req.body;
  console.log(req.user)
  try {

    const adminInfo = await userdetails.findOne({where:{role:'admin',organization:'Store'}})
    const username = adminInfo.dataValues.username;
    const secretKey = await decodeSecretKey(username)
console.log("hiiiiiiiii",username,secretKey)
    const response = await transferOwnership(pid, name, username,secretKey, organizations[organization]);

    if (!response) {
      res.status(404).json({ message: "Failed to transfer ownership" });
      return;
    }

    const exists = await products.findOne({ where: { pid } });

    if (!exists) {
      res.send("Product doesn't exist");
      return;
    }

    const transfer = await producthistory.findOne({ where: { pid } });
    const history = transfer ? transfer.dataValues.history : [];

    const product = await products.update({ status: "Sold" }, { where: { pid } });

    await producthistory.update({
      history: [...history, {
        time: time(),
        from: "Store",
        to: name,
        status: "Sold"
      }]
    }, { where: { pid } });

    res.send("Product sold successfully");
    console.log(product);
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = sellProduct;
