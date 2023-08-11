const { updateAndTransferProduct } = require('../../fabric-samples/asset-transfer-basic/application-javascript/updateProduct')
const { sequelize } = require('../../models')
const time = require('../../utils/time')
const decodeSecretKey = require('../../utils/decodeSecretKey')
const organizations = require('../../utils/constants/organizations')
const products = sequelize.models.products
const producthistory = sequelize.models.producthistory
// const transfer = await producthistory.findOne({ attributes: ['history'], where: { id } });

async function handleUpdate(id,name,image,battery,camera,price) {
    const transfer = await producthistory.findOne({ attributes: ['history'], where: { id } });
    const exists = await products.findOne({ where: { id } });
    if (exists) {
        await products.update({name,image,battery,camera,price, status: "Updated" }, { where: { id } });
        await producthistory.update({
            history: [
                ...transfer.dataValues.history,
                {
                    time: time(),
                    location: "Factory",
                    status: "Updated"
                }
            ]
        }, { where: { id } });
        return "Product Updated Successfully";
    } else {
        throw new Error("Product doesn't exist");
    }
}

// Function to handle the "transfer" operation
async function handleTransfer(id) {
    const transfer = await producthistory.findOne({ attributes: ['history'], where: { id } });
    // const transfer = await producthistory.findOne({ where: { id } });
    await products.update({transited:true}, { where: { id,status: "Updated" } });
    if (transfer) {
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
        return "Product History Updated";
    } else {
        throw new Error("Product Not available in the Factory");
    }
}




const updateProduct = async (req, res) => {
    const { username, organization } = req.user;
    let { id, name,image, battery, camera, price, operation } = req.body;
    const secretKey = decodeSecretKey(username)
    const response = await updateAndTransferProduct(id, operation, username,secretKey,organizations[organization])

    switch (operation) {
        case "update":
            let updateResult = await handleUpdate(id,name,image,battery,camera,price)
            res.status(200).send(updateResult);
            break;

        case 'transfer':
            transferResult = await handleTransfer(id);
            res.status(200).send(transferResult);
            break;

        default:
            res.status(404).send("Invalid Operation");
    }


}
module.exports = updateProduct