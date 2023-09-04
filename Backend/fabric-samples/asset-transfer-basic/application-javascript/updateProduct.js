const { connectToFabric } = require('./utils/connectFabric');

async function updateProduct(pid, contract) {
    console.log('\n--> Submit Transaction: UpdateProduct, Update the Product and set the status to Updated');
    const result = await contract.submitTransaction('UpdateProduct', pid);
    console.log('*** Result: committed', result);
    return result.toString();
}

async function transferProduct(pid, contract) {
    console.log('\n--> Submit Transaction: TransferProduct, Transfer Updated Product from factory to the warehouse');
    const result = await contract.submitTransaction('TransferProduct', pid, 'WareHouse', 'Updated');
    console.log('*** Result: committed', result);
    return result.toString();
}

async function updateAndTransferProduct(pid, operation, username, password, organization) {

    const { contract, gateway } = await connectToFabric(username, password, organization);

    try {
        if (operation === "update") {
            return await updateProduct(pid, contract);
        } else if (operation === "transfer") {
            return await transferProduct(pid, contract);
        } else {
            throw new Error('Invalid Operation');
        }
    } catch (error) {
        console.error(error.message);
        throw error;
    } finally {
        gateway.disconnect();
    }
}

module.exports = { updateAndTransferProduct };
