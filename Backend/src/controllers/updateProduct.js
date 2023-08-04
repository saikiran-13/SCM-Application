const { updateAndTransferProduct } = require('../../fabric-samples/asset-transfer-basic/application-javascript/updateProduct')
const { sequelize } = require('../../models')
const time = require('../../utils/time')
const decodeSecretKey = require('../../utils/decodeSecretKey')
const organizations = require('../../utils/constants/organizations')
const products = sequelize.models.products
const producthistory = sequelize.models.producthistory


async function handleUpdate(pid) {
    const exists = await products.findOne({ where: { pid } });
    if (exists) {
        await products.update({ status: "Updated" }, { where: { pid } });
        return "Product Updated Successfully";
    } else {
        throw new Error("Product doesn't exist");
    }
}

// Function to handle the "transfer" operation
async function handleTransfer(pid) {
    const transfer = await producthistory.findOne({ where: { pid } });
    if (transfer) {
        await producthistory.update({
            history: [
                ...transfer.dataValues.history,
                {
                    time: time(),
                    from: "Factory",
                    to: "WareHouse",
                    status: "Updated"
                }
            ]
        }, { where: { pid } });
        return "Product History Updated";
    } else {
        throw new Error("Product Not available in the Factory");
    }
}




const updateProduct = async (req, res) => {
    const { username, organization } = req.user;
    const { pid, operation } = req.body
    const secretKey = decodeSecretKey(username)
    const response = await updateAndTransferProduct(pid, operation, username,secretKey,organizations[organization])

    switch (operation) {
        case "update":
            let updateResult = await handleUpdate(pid)
            res.send(updateResult);
            break;

        case 'transfer':
            transferResult = await handleTransfer(pid);
            res.send(transferResult);
            break;

        default:
            res.send("Invalid Operation");
    }


}
module.exports = updateProduct