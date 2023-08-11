const { transferOwnership } = require('../../fabric-samples/asset-transfer-basic/application-javascript/transferOwnership');
const { sequelize } = require('../../models');
const time = require('../../utils/time');
const decodeSecretKey = require('../../utils/decodeSecretKey')
const organizations = require('../../utils/constants/organizations')
const products = sequelize.models.products;
const producthistory = sequelize.models.producthistory;
const userdetails = sequelize.models.userdetails;

const sellProduct = async (req, res) => {
  const { username, organization } = req.user;
  const { id, name } = req.body;
  console.log(id, "Iddddddd", name)
  console.log(req.user)
  try {

    const adminInfo = await userdetails.findOne({ where: { role: 'admin', organization: 'Store' } })
    const username = adminInfo.dataValues.username;
    const secretKey = await decodeSecretKey(username)
    console.log("hiiiiiiiii",username,secretKey)
    const response = await transferOwnership(id, name, username,secretKey, organizations[organization]);

    if (!response) {
      res.status(404).json({ message: "Failed to transfer ownership" });
      return;
    }

    const exists = await products.findOne({ where: { id } });

    if (!exists) {
      res.status(404).send("Product doesn't exist");
      return;
    }
    // const transfer = await producthistory.findOne({ attributes: ['history'], where: { id } });
    const transfer = await producthistory.findOne({ where: { id } });
    const history = transfer ? transfer.dataValues.history : [];
    const soldProduct = await products.findAll({ where: { id, status: 'Sold' } })

    if (soldProduct.length === 0) {
    
      const product = await products.update({ status: "Sold", owner: name, transited: true }, { where: { id } });

      await producthistory.update({
        history: [...history, {
          time: time(),
          from: "Store",
          to: name,
          status: "Sold"
        }]
      }, { where: { id } });

      res.status(200).json({ product });
      console.log(product);
    }

  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = sellProduct;
